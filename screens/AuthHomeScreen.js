import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class AuthHomeScreen extends React.Component {

  render() {
    return (
      <View style={{ flex: 1, }}>
        <TouchableOpacity
          style={{
            backgroundColor: "lightblue",
            marginHorizontal: 30,
            marginBottom: 20,
            padding: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "lightblue",
            overflow: "hidden",
            alignItems: 'center'
          }}
          onPress={() => this.props.navigation.navigate('SignUp')}
        >
          <Text>アカウントを作成する</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "lightblue",
            marginHorizontal: 30,
            marginBottom: 20,
            padding: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "lightblue",
            overflow: "hidden",
            alignItems: 'center'
          }}
          onPress={() => this.props.navigation.navigate('SignIn')}
        >
          <Text>ログイン</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Text>ログインできませんか？</Text>
        </TouchableOpacity>
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


export default AuthHomeScreen;