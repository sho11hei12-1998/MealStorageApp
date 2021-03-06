import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';


class FriendsAddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <Searchbar
          placeholder="検索"
          onChangeText={text => this.setState({ search: text })}
          value={this.state.search}
          returnKeyType='search'
          style={{ marginTop: 20, marginBottom: 20, marginHorizontal: 20 }}
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


export default FriendsAddScreen;