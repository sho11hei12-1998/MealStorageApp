import React from 'react';
import {
  StyleSheet, Text, View, Button,
  TouchableOpacity, Dimensions, ScrollView
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyPage_1 from 'app/screens/MyPageStack/MyPage_1';
import MyPage_2 from 'app/screens/MyPageStack/MyPage_2';

const TopTab = createMaterialTopTabNavigator();
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPosts: [],
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
    // 自分の投稿のみ読み込む
    const myPosts = await posts
    this.setState({
      myPosts: myPosts,
    });
  }

  // TopTab
  MyPageTab() {
    return (
      <TopTab.Navigator
        initialRouteName="MyPage_1"
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          activeBackgroundColor: 'white',
          inactiveBackgroundColor: 'white',
        }}
      >
        <TopTab.Screen
          name="MyPage_1"
          component={MyPage_1}
          options={{ tabBarLabel: 'Post' }}
        />
        <TopTab.Screen
          name="MyPage_2"
          component={MyPage_2}
          options={{ tabBarLabel: 'Stock' }}
        />
      </TopTab.Navigator>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#fff"
          placement="left"
          leftComponent={{ text: 'MyPage', style: styles.headerStyle }}
          rightComponent={
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => this.props.navigation.navigate('FriendsAdd')}
              >
                <Icon
                  name='person-add'
                  type='material-icons'
                  color='black'
                  size={25}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => this.props.navigation.navigate('Settings')}
              >
                <Icon
                  name='cog'
                  type='material-community'
                  color='black'
                  size={25}
                />
              </TouchableOpacity>
            </View>
          }
        />
        <View style={{ flexDirection: 'row', marginHorizontal: 30, }}>
          <View style={{ alignItems: 'flex-start', marginRight: 40 }}>
            <TouchableOpacity>
              <Icon
                name='account-circle'
                type='material'
                color='lightgray'
                size={70}
              />
            </TouchableOpacity>
            <Text>shohei_saginao</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', alignItems: 'center' }}>
            <View style={styles.MyPage_status}>
              <Text>100</Text>
              <Text>posts</Text>
            </View>
            <View style={styles.MyPage_status}>
              <Text>20</Text>
              <Text>friends</Text>
            </View>
            <View style={styles.MyPage_status}>
              <Text>50</Text>
              <Text>stock</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "lightgray",
            margin: 20,
            padding: 10,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "lightgray",
            overflow: "hidden",
            alignItems: 'center'
          }}
          onPress={() => this.props.navigation.navigate('ProfileEditing')}
        >
          <Text>プロフィールを編集する</Text>
        </TouchableOpacity>

        {/* TopTab描画 */}
        {this.MyPageTab()}

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Map')}
          style={{ position: 'absolute', bottom: 20, right: 20 }}
        >
          <Icon
            reverse
            name='place'
            type='material-icons'
            color='orange'
            size={30}
          />
        </TouchableOpacity>
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
    marginLeft: 25
  },
  MyPage_status: {
    padding: 10,
    alignItems: 'center'
  }
});

export default ProfileScreen;