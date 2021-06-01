import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Header, Icon, Input } from 'react-native-elements';

import Fire from 'app/screens/Fire_Posts';

class EnterInfoScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: null,
      address: null,
    };
  }

  // user情報を登録
  async onPressResister() {
    const { iconUrl, userName, address } = this.state;
    await Fire.shared.uploadUserInfo({
      iconUrl, userName, address
    });
    alert('登録が完了しました。');
  }


  render() {
    return (
      <View style={styles.container}>

        <Text style={{ fontSize: 30, marginTop: 50 }}>{'ユーザー名を入力'}</Text>
        <Input
          placeholder='User Name'
          label={'User Name'}
          value={this.state.userName}
          onChangeText={userName => this.setState({ userName })}
        />

        <Text style={{ fontSize: 30, marginTop: 50 }}>{'お住まいの都道府県を入力'}</Text>
        <Input
          placeholder='Enter Address'
          label={'Enter Address'}
          value={this.state.address}
          onChangeText={address => this.setState({ address })}
        />

        <Button
          title="登録"
          onPress={() => {
            this.onPressResister();
            this.props.navigation.navigate('Home');
          }}
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

export default EnterInfoScreen;