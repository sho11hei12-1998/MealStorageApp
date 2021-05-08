import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Header, Icon, Input, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

import firebase from 'firebase';
import fire from 'app/screens/fire';

//会員登録ボタンがタップされたあとの処理
// const _onPressSignUpButton = () => {
//   auth()
//     .sendSignInLinkToEmail(mailAddress, actionCodeSettings)
//     .then(() => {
//       AsyncStorage.setItem('key_mail_address', mailAddress)
//       Alert.alert('登録メールを送信しました', 'メール内のリンクを開き、登録を完了させてください。', [{ text: 'OK' }], { cancelable: false })
//     })
//     .catch(error => {
//       let dialogText = '入力をやりなおしてください'
//       if (error.code === 'auth/invalid-email') {
//         dialogText = '許可されていないアドレスです'
//       }
//       Alert.alert('処理に失敗しました', dialogText + error.code, [{ text: 'OK' }], { cancelable: false })
//     });
// }


// サインアップ
const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      if (user) {
        console.log('User account created & signed in!');
        // AsyncStorage.setItem('key_email', email)
        // AsyncStorage.setItem('key_password', password)
        return user
      }
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    })
}

// Handle the button press
// async function signInWithPhoneNumber(phoneNumber) {
//   const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//     'size': 'invisible',
//     'callback': (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       // onSignInSubmit();
//     }
//   });

//   const confirmation = await auth().signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
//     .then((confirmationResult) => {
//       // SMS sent. Prompt user to type the code from the message, then sign the
//       // user in with confirmationResult.confirm(code).
//       window.confirmationResult = confirmationResult;
//       // ...
//     }).catch((error) => {
//       // Error; SMS not sent
//       // ...
//     });
// }

// async function confirmCode() {
//   try {
//     await confirm.confirm(code);
//   } catch (error) {
//     console.log('Invalid code.');
//   }
// }

class SignUpScreen extends React.Component {
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


        {/* <Text style={{ fontSize: 30 }}>{'電話番号'}</Text>
        <Input
          placeholder='+8108029602350'
          autoCompleteType='phoneNumber'
          value={this.state.phoneNumber}
          onChangeText={phoneNumber => this.setState({ phoneNumber: phoneNumber })}
        />
        <Button
          id='sign-in-button'
          title="電話番号で登録"
          onPress={() => signInWithPhoneNumber('+81 80-2960-2350')}
        /> */}



        <Text style={{ fontSize: 30, marginTop: 50 }}>{'メールアドレス'}</Text>
        <Input
          placeholder='email@address.com'
          label={'E-mail'}
          keyboardType={'email-address'}
          value={this.state.email}
          onChangeText={email => this.setState({ email: email })}
        />
        <Input
          placeholder='Password'
          label={'Password'}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={password => this.setState({ password: password })}
        />
        <Button
          title="メールアドレスで登録"
          onPress={() => signUp(this.state.email, this.state.password)}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default SignUpScreen;