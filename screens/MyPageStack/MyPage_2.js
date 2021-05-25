import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Icon, Card } from 'react-native-elements';

import Fire from 'app/screens/Fire_Posts';


const SCREEN_WIDTH = Dimensions.get('window').width;

const category_item = [
  {
    id: 0,
    name: "焼肉",
    color: "gray",
  },
  {
    id: 1,
    name: "お寿司",
    color: "gray",
  },
  {
    id: 2,
    name: "ラーメン",
    color: "gray",
  },
  {
    id: 3,
    name: "中華料理",
    color: "gray",
  },
  {
    id: 4,
    name: "フランス料理",
    color: "gray",
  },
];
class MyPage_2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockPosts: [],
    };
    //  Firestoreのデータを読みこむ 
    this.downloadMyPosts();
  }

  // addPostModal.jsで追加した投稿をchildStateとして受け取り、HomeScreenで全投稿を管理する
  // updateAddedPostState = childState => {
  //   this.setState({
  //     myPosts: [...this.state.allPosts, ...childState],
  //   });
  // };

  async downloadMyPosts() {
    const posts = await Fire.shared.getPosts();
    await this.setState({
      stockPosts: posts,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            {category_item.map((item, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={styles.category_container}
                  onPress={() => this.props.navigation.navigate('Category', item.name)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 3,
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

export default MyPage_2;