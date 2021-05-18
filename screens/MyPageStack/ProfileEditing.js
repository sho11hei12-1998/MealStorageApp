import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon, Input, Header } from 'react-native-elements';

class ProfileEditingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userName: '',
      birth: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
          <Button title='キャンセル' onPress={() => this.props.navigation.goBack()} />
          <Button title='完了' onPress={() => this.props.navigation.navigate('Profile')} />
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
            placeholder='名前'
            onChangeText={text => this.setState({ name: text })}
            defaultValue={this.state.name}
            style={{ marginTop: 30 }}
          />
          <Input
            placeholder='ユーザーネーム'
            onChangeText={text => this.setState({ userName: text })}
            defaultValue={this.state.userName}
            style={{ marginTop: 10 }}
          />
          <Input
            placeholder='生年月日'
            onChangeText={text => this.setState({ birth: text })}
            defaultValue={this.state.birth}
            style={{ marginTop: 10 }}
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