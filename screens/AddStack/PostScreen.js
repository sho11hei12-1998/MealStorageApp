import React from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView,
  Image
} from 'react-native';
import { Icon, Input } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: null,
      shopName: '',
      text: '',
      addedPost: [],
    };
  }

  componentDidMount = () => {
    const imgUrl = this.props.route.params;
    this.setState({ imgUrl: imgUrl });
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
  }
  // HomeScreen.jsで投稿データのstateを管理する
  updateAddedPostState() {
    this.props.updateAddedPostState(this.state.addedPost);
  }
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
      this.props.navigation.navigate('Home')
    );
  }

  // shopName
  render_shopName() {
    return (
      <View>
        <Input
          placeholder='店名を入力'
          onChangeText={text => this.setState({ shopName: text })}
          defaultValue={this.state.shopName}
          style={{ marginTop: 30 }}
        />
      </View>
    );
  }

  // description
  render_text() {
    return (
      <View>
        <Input
          placeholder='詳細情報を入力'
          onChangeText={text => this.setState({ text: text })}
          defaultValue={this.state.text}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* shopName */}
          {this.render_shopName()}

          {/* description */}
          {this.render_text()}

          <Button
            title='シェア'
            onPress={() => this.onPressAdd()}
          // onPress={() => console.log(this.props.navigation.navigate('Home'))}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  }
});

export default PostScreen;