import React from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView,
  Image
} from 'react-native';
import { Icon, Input } from 'react-native-elements';

const { width, height } = Dimensions.get('window');
import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: '',
      text: '',
      textInfo: [],
    };
  }

  // shopName
  render_shopName() {
    return (
      <View>
        <Input
          placeholder='店名を入力'
          onChangeText={text => this.setState({ shopName: text })}
          defaultValue={this.state.shopName}
          style={{ marginTop: 30 }}
        />
      </View>
    );
  }

  // description
  render_text() {
    return (
      <View>
        <Input
          placeholder='詳細情報を入力'
          onChangeText={text => this.setState({ text: text })}
          defaultValue={this.state.text}
          style={{ marginTop: 10 }}
        />
      </View>
    );
  }

  updateTextInfoState() {
    this.props.updateTextInfoState(this.state.textInfo);
  };

  async onPressSave() {
    const { shopName, text } = await this.state;
    this.setState(
      {
        textInfo: [
          {
            shopName,
            text,
          },
        ],
      },
      () => console.log(this.state.textInfo),
      this.updateTextInfoState(),
      // this.props.navigation.goBack()
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* shopName */}
          {this.render_shopName()}

          {/* description */}
          {this.render_text()}

          <Button
            title='保存'
            onPress={() => this.onPressSave()}
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  }
});

export default PostScreen;