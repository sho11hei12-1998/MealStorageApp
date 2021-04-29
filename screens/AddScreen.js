import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';

class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: ''
    };
  }

  // 店名入力
  EnterShopName() {
    return (
      <View>
        <Input
          placeholder='店名を入力'
          onChangeText={text => this.setState({ shopName: text })}
          defaultValue={this.state.shopName}
        />
      </View>
    );
  }

  // 投稿ボタン描画
  renderAddButton() {
    return (
      <View>
        <Button title='投稿' />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgray', height: 200
          }}>
          <View>
            <Text>Add Image</Text>
          </View>
        </TouchableOpacity>


        {/* InputForm */}
        <View style={styles.inner}>
          {/* 店名を入力 */}
          {this.EnterShopName()}

          {/* 投稿ボタン */}
          {this.renderAddButton()}
        </View>
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
  inner: {
    padding: 30,
    flex: 1,
  },
});

export default AddScreen;