import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class MyPage_1 extends React.Component {

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.category_container}>
            <Text>焼肉</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category_container}>
            <Text>お寿司</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category_container}>
            <Text>ラーメン</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category_container}>
            <Text>焼肉</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category_container}>
            <Text>お寿司</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.category_container}>
            <Text>ラーメン</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 5,
    flexWrap: 'wrap'
  },
  category_container: {
    backgroundColor: 'lightgray',
    width: SCREEN_WIDTH / 2.2,
    height: SCREEN_WIDTH / 2.2,
    borderRadius: 10,
    margin: SCREEN_WIDTH * 0.015,
    marginTop: 10,
  }
});

export default MyPage_1;