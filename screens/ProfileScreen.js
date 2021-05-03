import React from 'react';
import {
  StyleSheet, Text, View, Button,
  TouchableOpacity, Dimensions
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import MyPage_1 from 'app/screens/MyPage_1';
import MyPage_2 from 'app/screens/MyPage_2';

const TopTab = createMaterialTopTabNavigator();
class ProfileScreen extends React.Component {
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
          options={{ tabBarLabel: 'Favorite' }}
        />
      </TopTab.Navigator>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#fff"
          placement="center"
          centerComponent={{ text: 'MyPage', style: styles.headerStyle }}
          rightComponent={
            <View>
              <TouchableOpacity
                style={{ marginRight: 15 }}
                onPress={() => this.props.navigation.navigate('Settings')}
              >
                <Icon
                  name='dots-horizontal'
                  type='material-community'
                  color='black'
                  size={30}
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
              <Text>800</Text>
              <Text>follower</Text>
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
          onPress={() => this.props.navigation.navigate('')}
        >
          <Text>プロフィールを編集する</Text>
        </TouchableOpacity>

        {/* TopTab描画 */}
        {this.MyPageTab()}

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
  MyPage_status: {
    padding: 10,
    alignItems: 'center'
  }
});

export default ProfileScreen;