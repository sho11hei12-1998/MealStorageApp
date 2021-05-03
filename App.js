import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from 'app/screens/HomeScreen';
import DetailScreen from 'app/screens/DetailScreen';
import SearchScreen from 'app/screens/SearchScreen';
import AddScreen from 'app/screens/AddScreen';
import FavoriteScreen from 'app/screens/FavoriteScreen';
import ProfileScreen from 'app/screens/ProfileScreen';
import SettingsScreen from 'app/screens/SettingsScreen';
import AuthHomeScreen from 'app/screens/Auth/AuthHomeScreen'
import SignUpScreen from 'app/screens/Auth/SignUpScreen';
import SignInScreen from 'app/screens/Auth/SignInScreen';

import firebase from 'firebase';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName='Home'
      headerMode="none"
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}

const SearchStack = createStackNavigator();
function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      initialRouteName='Search'
      headerMode="none"
    >
      <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
  );
}

const AddStack = createStackNavigator();
function AddStackScreen() {
  return (
    <AddStack.Navigator
      initialRouteName='Add'
      headerMode="none"
    >
      <AddStack.Screen name="Add" component={AddScreen} />
    </AddStack.Navigator>
  );
}

const FavoriteStack = createStackNavigator();
function FavoriteStackScreen() {
  return (
    <FavoriteStack.Navigator
      initialRouteName='Favorite'
      headerMode='none'
    >
      <FavoriteStack.Screen name="Favorite" component={FavoriteScreen} />
    </FavoriteStack.Navigator>
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
        }
      }}
      headerMode="none"
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
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
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused
              ? 'home'
              : 'home';
          } else if (route.name === 'Search') {
            iconName = focused
              ? 'search'
              : 'search';
          } else if (route.name === 'Add') {
            iconName = focused
              ? 'add'
              : 'add';
          } else if (route.name === 'Favorite') {
            iconName = focused
              ? 'place'
              : 'place';
          } else if (route.name === 'Profile') {
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
      <Tab.Screen name="Search" component={SearchStackScreen} />
      <Tab.Screen name="Add" component={AddStackScreen} />
      <Tab.Screen name="Favorite" component={FavoriteStackScreen} />
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

      isLoading: false,
      isAuth: true,
    };
  }

  componentDidMount() {
    // Firebase Auth
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ authState: user.uid });
        console.log(this.state.authState);
        console.log('Welcome Sign IN now');
      } else {
        this.setState({ authState: false });
        console.log('No Sign IN now');
      }
    });
  }

  render() {
    const { isLoading, isAuth } = this.state;

    if (isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
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
  },
});
