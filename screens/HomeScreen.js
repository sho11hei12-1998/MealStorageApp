import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
    };
    //  Firestoreのデータを読みこむ 
    this.downloadAllPosts();
  }

  // addPostModal.jsで追加した投稿をchildStateとして受け取り、PostScreenで全投稿を管理する
  updateAddedPostState = childState => {
    this.setState({
      allPosts: [...this.state.allPosts, ...childState],
    });
  };

  async downloadAllPosts() {
    const posts = await Fire.shared.getPosts();
    this.setState({
      allPosts: posts,
    });
  }

  render() {
    const { allPosts } = this.state;
    return (
      <View style={styles.container}>

        {/* renderPostImage */}
        <ScrollView pagingEnabled={true}>

          {allPosts.map((item, i) => {
            console.log(item);
            return (
              <TouchableOpacity
                key={'post_' + i}
                // onPress={() => this.props.navigation.navigate('Detail')}
                style={{ justifyContent: 'center' }}
              >
                <Card
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_HEIGHT - 82,
                  }}>
                  <Card.Cover
                    style={{
                      width: SCREEN_WIDTH,
                      height: SCREEN_WIDTH,
                    }}
                    source={{ uri: item.imgUrl }} />
                  <Card.Title title={item.shopName} subtitle="Card Subtitle" />
                  <Card.Content>
                    <Title>Card title</Title>
                    <Paragraph>Card content</Paragraph>

                    <View style={{ alignItems: 'flex-end' }}>
                      <Icon
                        name='heart'
                        type='material-community'
                        color='gray'
                        size={40}
                        style={{ padding: 10 }}
                      />
                      <Icon
                        name='comment'
                        type='material-community'
                        color='gray'
                        size={40}
                        style={{ padding: 10 }}
                      />
                      <Icon
                        name='share'
                        type='material-community'
                        color='gray'
                        size={40}
                        style={{ padding: 10 }}
                      />
                    </View>
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
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
  headerStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;