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

import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';
import TakePicture from 'app/screens/AddStack/TakePicture';
import PostLibrary from 'app/screens/AddStack/PostLibrary';

const { width, height } = Dimensions.get('window');
const AddTopTab = createMaterialTopTabNavigator();

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

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />

        {/* TakePictureコンポーネント呼び出し */}
        <TakePicture />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AddScreen;