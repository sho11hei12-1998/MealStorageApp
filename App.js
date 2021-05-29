import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';

// Home
import HomeScreen from 'app/screens/HomeStack/HomeScreen';
import DetailScreen from 'app/screens/HomeStack/DetailScreen';
import SearchScreen from 'app/screens/HomeStack/SearchScreen';
import SearchDetailScreen from 'app/screens/HomeStack/SearchDetailScreen';

// Add
import AddScreen from 'app/screens/AddStack/AddScreen';
import PostScreen from 'app/screens/AddStack/PostScreen'

// Profile
import ProfileScreen from 'app/screens/MyPageStack/ProfileScreen';
import ProfileEditing from 'app/screens/MyPageStack/ProfileEditing';
import MyPostDetail from 'app/screens/MyPageStack/MyPostDetail';
import CategoryScreen from 'app/screens/MyPageStack/CategoryScreen';
import MapScreen from 'app/screens/MyPageStack/MapScreen';
import FriendsAddScreen from 'app/screens/MyPageStack/FriendsAddScreen';
import SettingsScreen from 'app/screens/MyPageStack/SettingsScreen';

// Auth
import AuthHomeScreen from 'app/screens/Auth/AuthHomeScreen'
import SignUpScreen from 'app/screens/Auth/SignUpScreen';
import SignInScreen from 'app/screens/Auth/SignInScreen';

import firebase from 'firebase';
import Fire from 'app/screens/Fire_Posts';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName='Home'
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      options={{ tabBarVisible: false }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
      <HomeStack.Screen name="SearchDetail" component={SearchDetailScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const AddStack = createStackNavigator();
function AddStackScreen() {
  return (
    <AddStack.Navigator
      initialRouteName='Add'
      headerMode="none"
      mode='modal'
      screenOptions={{
        tabBarIcon: false,
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      options={{ tabBarVisible: false }}
    >
      <AddStack.Screen name="Add" component={AddScreen} />
      <AddStack.Screen name="Post" component={PostScreen} />
    </AddStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#333399",
        },
        gestureEnabled: true,
        cardOverlayEnabled: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
      headerMode="none"
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="ProfileEditing" component={ProfileEditing} />
      <ProfileStack.Screen name="MyPostDetail" component={MyPostDetail} />
      <ProfileStack.Screen name="Category" component={CategoryScreen} />
      <ProfileStack.Screen name="Map" component={MapScreen} />
      <ProfileStack.Screen name="FriendsAdd" component={FriendsAddScreen} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}

// Auth Screen
const AuthStack = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName='AuthHome'
      headerMode="none"
    >
      <AuthStack.Screen name="AuthHome" component={AuthHomeScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
}

// BottomTab
const Tab = createBottomTabNavigator();
function BottomTabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route, navigation, index }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          }
          else if (route.name === 'Add') {
            iconName = focused
              ? 'add'
              : 'add';
            if (route.index === -1) {
              return null
            }
          }
          else if (route.name === 'Profile') {
            iconName = focused
              ? 'person'
              : 'person';
          }
          return <Icon name={iconName} size={size} color={color} type="material-icons" />;
        },
      }
      )}
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        activeBackgroundColor: 'white',
        inactiveBackgroundColor: 'white',
      }}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Add" component={AddStackScreen}
        options={{
          tabBarVisible: false,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      authState: false,
      arrays: [],
      address: '',

      isReady: false,
      isAuth: true,
    };
  }

  async componentDidMount() {
    // Splash Screen表示
    try {
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();

      const posts = await Fire.shared.getPosts();
      if (posts) {
        console.log(true)
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      this.setState({ isReady: true });
    }

    // Firebase Auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authState: user.uid });
        this.setState({ isAuth: true });
        console.log(this.state.authState);
        console.log('Welcome Sign IN now');
      } else {
        this.setState({ isAuth: false });
        console.log('No Sign IN now');
      }
    });
  }

  updateAddedPostState = childState => {
    this.setState({
      allPosts: [...this.state.allPosts, ...childState],
    });
  };

  render() {
    const { isReady, isAuth } = this.state;

    if (isReady) {
      SplashScreen.hideAsync();
    }
    else if (!isReady) {
      return null;
    }

    return (
      <View style={styles.container}>
        <StatusBar style='auto' />
        <NavigationContainer>
          {isAuth && <BottomTabStack />}
          {!isAuth && <AuthNavigator />}
        </NavigationContainer>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
});
