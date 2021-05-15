import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Camera } from 'expo-camera';

class TakePicture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      flash_type: 'false',

      photo: null,
    };
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === 'granted' });
  }

  // Flashの操作
  changeFlash = () => {
    this.setState({ flash_type: !this.state.flash_type });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };


  render() {
    const { hasPermission, type } = this.state;
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    console.log('flash_type: ' + this.state.flash_type);

    return (
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          type={type}
          ref={ref => {
            this.camera = ref;
          }}
        >
          {/* cameraHeaderIcon */}
          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}>
              <Icon
                name='close'
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
            <TouchableOpacity>
              <Icon
                name='settings'
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
                  this.setState({ photo: photo });
                  console.log(this.state.photo);
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
              console.log(this.state.type);
            }}>
            <Icon
              name='flip-camera-ios'
              type='material'
              color='gray'
              size={40}
            />
          </TouchableOpacity>
        </View>
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
    borderRadius: 10,
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
  // buttonContainer: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   flexDirection: 'row',
  //   margin: 20,
  // },
  // library: {
  //   flex: 0.1,
  //   alignSelf: 'flex-end',
  //   alignItems: 'center',
  // },
});


export default TakePicture;