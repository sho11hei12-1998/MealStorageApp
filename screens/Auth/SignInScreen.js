import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Header, ListItem, Badge, SearchBar, Icon, Input } from 'react-native-elements';

import * as firebase from 'firebase';
// import fire from './fire';

// サインイン
const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log("signIn Success!", response);
      return response
    })
    .catch(error => {
      console.log("error", error.message);
      return error.message
    });
}

class SignInScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      phoneNumber: '+81',
      errorMessage: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="none"
          leftComponent={
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <Icon name="chevron-left" size={40} color='gray' />
              </TouchableOpacity>
            </View>
          }
        />

        <Text style={{ fontSize: 30 }}>{'メールアドレス'}</Text>

        <Input
          placeholder='email@address.com'
          value={this.state.email}
          onChangeText={email => this.setState({ email: email })}
        />
        <Input
          placeholder='Password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password: password })}
        />
        <Button
          title="ログイン"
          onPress={() => {
            signIn(this.state.email, this.state.password);
            alert('こんにちは');
          }}
        />

        <View style={{ marginTop: 30 }}>
          <Button title='Appleでログイン' />
          <Button title='Facebookでログイン' />
          <Button title='Googleでログイン' />
          <Button title='電話番号でログイン' />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});

export default SignInScreen;