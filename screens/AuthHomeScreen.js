import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class AuthHomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: 10, marginVertical: 20 }}>
          <Text>アカウントを作成するか、ログインすると、あなたはMealSharingの利用規約に同意することになります。当社における個人情報の取り扱いについては、プライバシーポリシーとクッキーポリシーをご覧ください。</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: "lightblue",
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
});


export default AuthHomeScreen;