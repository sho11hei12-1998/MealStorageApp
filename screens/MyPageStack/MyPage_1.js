import React from 'react';
import {
  StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, ScrollView,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

import Fire from 'app/screens/Fire_Posts';

class MyPage_1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: [],
    };
    //  Firestoreのデータを読みこむ 
    this.downloadMyPosts();
  }

  async downloadMyPosts() {
    const posts = await Fire.shared.getPosts();
    await this.setState({
      myPosts: posts,
    });
  }

  render() {
    const { myPosts } = this.state;
    return (
      <ScrollView>
        <View style={styles.container}>
          {myPosts
            .sort((a, b) => b.postIndex - a.postIndex)
            .map((item, i) => {
              return (
                <View key={'post_' + i}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('MyPostDetail', item)}>
                    <Image
                      style={{
                        width: width / 2.2,
                        height: 250,
                        margin: 5,
                        borderRadius: 10
                      }}
                      source={{ uri: item.imgUrl }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
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
    flexWrap: 'wrap',
    padding: 7
  },
});

export default MyPage_1;