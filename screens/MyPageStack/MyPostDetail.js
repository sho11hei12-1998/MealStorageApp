import React from 'react';
import { ImageBackground } from 'react-native';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Image,
  SafeAreaView, Dimensions
} from 'react-native';
import { Icon } from 'react-native-elements';
import Fire from 'app/screens/Fire_Posts';

const { width, height } = Dimensions.get('window');

class MyPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DetailPost: [],
    };
  }

  componentDidMount = async () => {
    const DetailPost = this.props.route.params;
    await this.setState({ DetailPost: DetailPost });
    console.log(this.state.DetailPost);
  }

  // 投稿を非表示にする
  notDisplayPost(postIndex) {
    Fire.shared.notDisplayPost({
      postIndex,
    });
    // MyPageのstateをchange
    // this.props.changePost()
  }

  // 投稿を削除する
  deletePost(postIndex) {
    Fire.shared.deletePost({
      postIndex,
    });
  }

  render() {
    const { DetailPost } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <ImageBackground
            style={{
              width: width,
              height: height,
            }}
            source={{ uri: DetailPost.imgUrl }}
          >
            <SafeAreaView />
            <View
              style={{
                flexDirection: 'row', justifyContent: 'space-between',
                marginHorizontal: 10, marginTop: 10
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon
                  reverse
                  name='close'
                  type='material-icons'
                  color='gray'
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.notDisplayPost(DetailPost.postIndex)}
              >
                <Icon
                  reverse
                  name='check'
                  type='material-icons'
                  color='gray'
                  size={20}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  // this.deletePost(DetailPost.postIndex),
                  this.props.navigation.goBack()
                }
              >
                <Icon
                  reverse
                  name='delete'
                  type='material-icons'
                  color='gray'
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </ImageBackground>
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

export default MyPostDetail;