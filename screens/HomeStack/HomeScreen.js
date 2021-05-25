import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { AppleCard, AppOfTheDayCard } from 'react-native-apple-card-views';

import Fire from 'app/screens/Fire_Posts';

const { width, height } = Dimensions.get('window');
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPosts: [],
      stock_status: false,
    };
    //  Firestoreのデータを読みこむ 
    this.downloadAllPosts();
  }

  // addPostModal.jsで追加した投稿をchildStateとして受け取り、HomeScreenで全投稿を管理する
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

  stockItem(i) {
    this.setState({ stock_status: !this.state.stock_status });
    console.log("stock_status Changed!");
  }

  render() {
    const { allPosts } = this.state;
    return (
      <View style={styles.container}>
        {/* <SafeAreaView /> */}
        <Header
          backgroundColor="#fff"
          placement="left"
          leftComponent={{ text: 'おはよう', style: styles.headerStyle }}
          rightComponent={
            <View>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => this.props.navigation.navigate('Search')}
              >
                <Icon
                  name='search'
                  type='material-icons'
                  color='black'
                  size={25}
                />
              </TouchableOpacity>
            </View>
          }
        />

        {/* renderPostImage */}
        <ScrollView
          style={{ alignSelf: 'center', paddingTop: 10 }}
        >
          {allPosts.map((item, i) => {
            {/* console.log(item); */ }
            return (
              <View
                key={'post_' + i}
                style={styles.itemCard_container}
              >
                <AppleCard
                  smallTitle="焼肉"
                  largeTitle={item.shopName}
                  footnoteText={item.text}
                  footnoteTextStyle={{ fontSize: 20 }}
                  resizeMode="cover"
                  source={{ uri: item.imgUrl }}
                  backgroundStyle={{
                    height: 400,
                  }}
                  onPress={() => this.props.navigation.navigate('Detail', item)}
                />
                <TouchableOpacity
                  onPress={() => this.stockItem(i)}>
                  <Icon
                    name={
                      this.state.stock_status === false
                        ? 'turned-in-not' : 'done'
                    }
                    type='material-icons'
                    color='black'
                    size={35}
                  />
                </TouchableOpacity>
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
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 20
  },
  itemCard_container: {
    marginBottom: 30
  }
});

export default HomeScreen;