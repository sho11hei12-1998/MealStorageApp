import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, Image, Dimensions,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { Icon, Input, Button, Header } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import { Camera } from 'expo-camera';

import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';
import TakePicture from 'app/screens/AddStack/TakePicture';
import PostLibrary from 'app/screens/AddStack/PostLibrary';
import { render } from 'react-dom';

const { width, height } = Dimensions.get('window');
const AddTopTab = createMaterialTopTabNavigator();

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // camera
      cameraPermission: null,
      type: Camera.Constants.Type.back,
      flash_type: 'false',

      // location
      locationPermission: null,
      location: null,
      errorMsg: null,

      imgUrl: null,
      shopName: '',
      text: '',
      addedPost: [],
    };
  }

  async componentDidMount() {
    // camera permission
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ cameraPermission: status });
    console.log(this.state.cameraPermission);
    if (this.state.cameraPermission === null || this.state.cameraPermission === false) {
      alert('カメラのアクセスが許可されていません。')
    }
    else if (this.state.cameraPermission === 'granted') {
      return;
    }

    // location permission
    // const status = await Location.requestForegroundPermissionsAsync();
    // this.setState({ locationPermission: status });
    // console.log(this.state.locationPermission);

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location: location });
    console.log(this.state.location);
  }

  // Flashの操作
  changeFlash = () => {
    this.setState({ flash_type: !this.state.flash_type });
  }



  renderCamera() {
    const { cameraPermission, type } = this.state;
    return (
      <Camera
        style={styles.camera}
        type={type}
        ref={ref => {
          this.camera = ref;
        }}
      >
        {/* cameraHeaderIcon */}
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Icon
              name='settings'
              type='material-icons'
              color='white'
              size={40}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.changeFlash()} >
            <Icon
              name={
                this.state.flash_type === false
                  ? 'flash-on' : 'flash-off'
              }
              type='material-icons'
              color='white'
              size={40} />

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}>
            <Icon
              name='close'
              type='material-icons'
              color='white'
              size={40}
            />
          </TouchableOpacity>
        </View>

        {/* camera_button */}
        <TouchableOpacity
          style={styles.camera_button}
          onPress={() => {
            if (this.camera) {
              this.camera.takePictureAsync().then(photo => {
                // カメラオブジェクト取得
                this.setState({ imgUrl: photo.uri });
                console.log(this.state.imgUrl);
              });
            }
          }} >
          <Icon
            name='radio-button-unchecked'
            type='material'
            color='white'
            size={65}
          />
        </TouchableOpacity>
      </Camera>
    );
  }

  renderFooter() {
    const { type } = this.state;
    return (
      <View style={styles.footerIcons}>
        <TouchableOpacity>
          <Icon
            name='collections'
            type='material'
            color='gray'
            size={40}
          />
        </TouchableOpacity>
        {/* camera反転button */}
        <TouchableOpacity
          onPress={() => {
            this.setState({
              type: type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            });
            console.log('cameraType changed');
          }}>
          <Icon
            name='flip-camera-ios'
            type='material'
            color='gray'
            size={40}
          />
        </TouchableOpacity>
      </View>
    );
  }

  // カメラ撮影後
  renderImage() {
    return (
      <View>
        <ImageBackground
          style={{
            width: width,
            height: height - 200,
            borderRadius: 20
          }}
          source={{ uri: this.state.imgUrl }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ imgUrl: null })}
            style={{ alignItems: 'flex-start', marginLeft: 20 }}>
            <Icon
              name='close'
              type='material-icons'
              color='white'
              size={40}
            />
          </TouchableOpacity>
        </ImageBackground>
        <Button title='次へ' onPress={() => this.props.navigation.navigate('Post', this.state.imgUrl)} />
      </View>
    );
  }

  render() {
    // camera
    const { cameraPermission, type } = this.state;

    // location
    const { location, errorMsg } = this.state;
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }
    console.log(text);

    return (
      <View style={styles.container}>
        <SafeAreaView />

        {/* camera描画 */}
        {this.state.imgUrl === null
          ? this.renderCamera()
          : this.renderImage()
        }

        {/* renderFooter */}
        {this.state.imgUrl === null
          ? this.renderFooter()
          : <View />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  headerIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  camera_button: {
    marginBottom: 20
  },
  footerIcons: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});

export default AddScreen;