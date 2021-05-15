import React from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      imgUrl: '',
      shopName: '',
      text: '',
      addedPost: [],
    };
  }

  componentDidMount = () => {
    const photo = this.props.navigation.state.params;
    this.setState({ photo: photo });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Image
            style={{
              width: width,
              height: height,
            }}
            source={{ uri: this.state.photo }}
          />
          <Button title='シェア' />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default PostScreen;