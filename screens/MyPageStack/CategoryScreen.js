import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Icon, Header, Card } from 'react-native-elements';

import { AppleCard } from 'react-native-apple-card-views';
import Fire from 'app/screens/Fire_Posts';


const { width, height } = Dimensions.get("window");

class CategoryScreen extends React.Component {
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

  componentDidMount() {
    // const title_name = this.props.navigation.state.params;
    // this.setState({ title: title_name });
  }

  header() {
    return (
      <View style={{ alignItems: 'flex-start', marginLeft: 20, }}>
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => this.props.navigation.navigate('Profile')}
        >
          <Icon
            name='arrow-left'
            type='material-community'
            color='black'
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { stockPosts } = this.state;
    return (
      <View style={styles.container}>

        {this.header()}

        <ScrollView
          style={{ alignSelf: 'center', paddingTop: 10 }}
        >
          {stockPosts
            .sort((a, b) => b.postIndex - a.postIndex)
            .map((item, i) => {
              {/* console.log(item); */ }
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
                      height: 300,
                    }}
                    onPress={() => this.props.navigation.navigate('Detail', item)}
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

export default CategoryScreen;