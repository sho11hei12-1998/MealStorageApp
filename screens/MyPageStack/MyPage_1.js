import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class MyPage_1 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.posts_container}>
          <Text>Test1</Text>
        </View>
        <View style={styles.posts_container}>
          <Text>Test1</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 7
  },
  posts_container: {
    backgroundColor: 'lightgray',
    width: width / 2.2,
    height: 250,
    margin: 5,
    borderRadius: 10
  }
});

export default MyPage_1;