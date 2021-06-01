import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon, Input, Header } from 'react-native-elements';

import Fire from 'app/screens/Fire_Posts';
class ProfileEditingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconUrl: null,
      userName: null,
      birth: null,
      address: null,
    };
  }

  // user情報を登録
  async submitUserInfo() {
    const { iconUrl, userName, birth, address } = this.state;
    await Fire.shared.updateUserInfo({
      iconUrl, userName, birth, address
    });
    alert('登録の変更が完了しました。');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
          <Button title='キャンセル' onPress={() => this.props.navigation.goBack()} />
          <Button title='保存'
            onPress={() => {
              this.submitUserInfo();
              this.props.navigation.navigate('Profile');
            }} />
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity>
            <Icon
              name='account-circle'
              type='material'
              color='lightgray'
              size={80}
            />
          </TouchableOpacity>
          <Input
            placeholder='ユーザー名'
            label={'User Name'}
            value={this.state.userName}
            onChangeText={text => this.setState({ userName: text })}
          />
          <Input
            placeholder='生年月日'
            label={'born'}
            value={this.state.born}
            onChangeText={text => this.setState({ birth: text })}
          />
          <Input
            placeholder='お住まい'
            label={'address'}
            value={this.state.address}
            onChangeText={text => this.setState({ address: text })}
          />
        </View>
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


export default ProfileEditingScreen;