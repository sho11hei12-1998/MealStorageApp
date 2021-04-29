import React from 'react';
import {
  StyleSheet, Text, View, Button,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';


class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ padding: 30, alignItems: 'flex-start' }}>
          <TouchableOpacity>
            <Icon
              name='account-circle'
              type='material'
              color='lightgray'
              size={70}
            />
          </TouchableOpacity>
          <Text>shohei_saginao</Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "lightgray",
            marginHorizontal: 30,
            marginBottom: 100,
            padding: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "lightgray",
            overflow: "hidden",
            alignItems: 'center'
          }}
          onPress={() => this.props.navigation.navigate('')}
        >
          <Text>プロフィールを編集する</Text>
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

export default ProfileScreen;