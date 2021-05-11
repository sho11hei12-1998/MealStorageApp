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
        <Camera style={styles.camera} type={type}>
          {/* cameraHeaderIcon */}
          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Icon
                name='close'
                type='material-icons'
                color='lightgray'
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeFlash()} >
              <Icon
                name='flash-off'
                type='material-icons'
                color='lightgray'
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name='settings'
                type='material'
                color='lightgray'
                size={40}
              />
            </TouchableOpacity>
          </View>
          {/* camera反転button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camera_flip}
              onPress={() => {
                this.setState({
                  type: type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                });
              }}>
              <Icon
                name='camera'
                type='material'
                color='white'
                size={40}
              />
            </TouchableOpacity>
          </View>
        </Camera>
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
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  collections: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  camera_flip: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
});


export default TakePicture;