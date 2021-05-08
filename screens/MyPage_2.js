import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';

class MyPage_2 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Card></Card>
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

export default MyPage_2;