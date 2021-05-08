import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import firebase from 'firebase';

// サインアウト
const signOut = () => {
  return firebase.auth().signOut()
    .then(response => {
      console.log('User signed out!');
      return response
    })
    .catch(error => {
      console.log("error", error.message);
      return error.message
    });
}
class SettingsScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Button title='サインアウト' onPress={() => signOut()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default SettingsScreen;