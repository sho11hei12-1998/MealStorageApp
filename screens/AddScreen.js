import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,
  ImageBackground
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { Icon, Input, Button, Header } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';
import { AddButton } from './AddButton';

const { width, height } = Dimensions.get('window');

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: '',
      shopName: '',
      text: '',
      addedPost: [],
    };
  }

  // カメラを起動
  _takePhoto = async (index) => {

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false
    });

    if (!result.cancelled) {
      const newImageURIs = this.state.foodRecords.imageURIs;
      newImageURIs[index] = { uri: result.uri };


    }
  }

  // ライブラリから写真を読み込み
  onAddImagePressed = async () => {
    // let cameraRollPermission = await AsyncStorage.getItem('cameraRollPermission');

    // // もしまだ許可してなかったら、
    // if (cameraRollPermission !== 'granted') {
    //   // 許可を取ってみる
    //   let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //   // もしユーザーが許可しなかったら、
    //   if (permission.status !== 'granted') {
    //     ;
    //   }
    //   // (もしユーザーが許可したら、)カメラロールアクセス許可状況をスマホ内に保存する
    //   try {
    //     await AsyncStorage.setItem('cameraRollPermission', permission.status);
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }

    // else if (cameraRollPermission === 'granted') {
    // カメラロールを起動する
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 画像のみ選択可(ビデオは選択不可)
      allowsEditing: true // 編集可
    });

    if (!result.cancelled) {
      // ImageManipulatorでリサイズ処理
      // const actions = [];
      // actions.push({ resize: { width: 350 } });
      const manipulatorResult = await ImageManipulator.manipulateAsync(
        result.uri,
        // actions,
        // {
        //   compress: 0.4,
        // },
      );
      this.setState({
        imgUrl: manipulatorResult.uri,
      });
    }
    // }
  };
  renderAddImage() {
    return (
      <TouchableOpacity
        onPress={() => this.onAddImagePressed()}
        style={{ justifyContent: 'center' }}
      >
        {this.state.imgUrl ? (
          <ImageBackground
            style={{
              width: width,
              height: width,
              justifyContent: 'center'
            }}
            source={{ uri: this.state.imgUrl }}>

            <View style={{ justifyContent: 'flex-end' }}>
              {/* 店名を入力 */}
              <View>
                <Input
                  placeholder='店名を入力'
                  onChangeText={text => this.setState({ shopName: text })}
                  defaultValue={this.state.shopName}
                  style={{ marginTop: 30 }}
                />
              </View>
              {/* テキストを入力 */}
              <View>
                <Input
                  placeholder='テキストを入力'
                  onChangeText={text => this.setState({ text: text })}
                  defaultValue={this.state.text}
                />
              </View>
            </View>
          </ImageBackground>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'lightgray',
              height: height
            }}>
            <Icon
              name='camera'
              type='material-community'
              color='gray'
              size={30}
            />
            <Text>Add Image</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  // 店名入力
  // EnterShopName() {
  //   return (
  //     <View>
  //       <Input
  //         placeholder='店名を入力'
  //         onChangeText={text => this.setState({ shopName: text })}
  //         defaultValue={this.state.shopName}
  //       />
  //     </View>
  //   );
  // }

  // テキスト入力
  // EnterText() {
  //   return (
  //     <View>
  //       <Input
  //         placeholder='テキストを入力'
  //         onChangeText={text => this.setState({ text: text })}
  //         defaultValue={this.state.text}
  //       />
  //     </View>
  //   );
  // }

  // 投稿時の処理
  async onPressAdd() {
    await this.uploadPostImg();
    const { imgUrl, shopName, text, postIndex } = await this.state;
    this.uploadPost(imgUrl, shopName, text, postIndex);
    this.setState(
      {
        addedPost: [
          {
            imgUrl,
            shopName,
            text,
            postIndex,
          },
        ],
      },
      () => this.updateAddedPostState(),
    );
  }

  uploadPostImg = async () => {
    const metadata = {
      contentType: 'image/jpeg',
    };
    const postIndex = Date.now().toString();
    const storage = firebase.storage();
    const imgURI = this.state.imgUrl;
    const response = await fetch(imgURI);
    const blob = await response.blob();
    const uploadRef = storage.ref('images').child(`${postIndex}`);

    // storageに画像を保存
    await uploadRef.put(blob, metadata).catch(() => {
      alert('画像の保存に失敗しました');
    });

    // storageのダウンロードURLをsetStateする
    await uploadRef
      .getDownloadURL()
      .then(url => {
        this.setState({
          imgUrl: url,
          postIndex,
        });
      })
      .catch(() => {
        alert('失敗しました');
      });
  };
  // stateに入っているダウンロードURLなどをFirestoreに記述する
  uploadPost(url, shopName, text, postIndex) {
    Fire.shared.uploadPost({
      url,
      shopName,
      text,
      postIndex,
    });
    this.props.navigate.navigation('Home');
  }
  // PostScreen.jsで投稿データのstateを管理する
  updateAddedPostState() {
    this.props.updateAddedPostState(this.state.addedPost);
  }

  // 投稿ボタン描画
  renderAddButton() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onPressAdd()}
          style={{ position: 'absolute', right: 0, bottom: 0 }}>
          <Icon
            reverse
            name='send'
            type='material-icons'
            color='skyblue'
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    console.log(this.state.imgUrl);
    return (
      <View style={styles.container}>

        {/* 画像を選択 */}
        {this.renderAddImage()}

        {/* InputForm */}
        <View style={styles.inner}>
          {/* 店名を入力 */}
          {/* {this.EnterShopName()} */}

          {/* テキストを入力 */}
          {/* {this.EnterText()} */}

          {/* 投稿ボタン */}
          {this.renderAddButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  inner: {
    padding: 30,
    flex: 1,
  },
});

export default AddScreen;