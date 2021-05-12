import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { AppleCard } from 'react-native-apple-card-views';

import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';

const { width, height } = Dimensions.get('window');
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
        <SafeAreaView />
        <View style={{ marginLeft: 30, marginBottom: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 25 }}>おはよう</Text>
        </View>

        {/* renderPostImage */}
        <ScrollView
          pagingEnabled={true}
          style={{ alignSelf: 'center' }}
        >
          {allPosts.map((item, i) => {
            console.log(item);
            return (
              <View
                key={'post_' + i}
                style={styles.itemCard_container}
              >
                <AppleCard
                  smallTitle=""
                  largeTitle={item.shopName}
                  footnoteText={item.text}
                  resizeMode="cover"
                  source={{ uri: item.imgUrl }}
                  backgroundStyle={{
                    height: 400,
                  }}
                  onPress={() => this.props.navigation.navigate('Detail')}
                />
              </View>
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
  },
  headerStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemCard_container: {
    marginBottom: 30
  }
});

export default HomeScreen;