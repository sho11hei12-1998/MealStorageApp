import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';
import AddScreen from './screens/AddScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ProfileScreen from './screens/ProfileScreen';
// import SettingsScreen from './screens/SettingsScreen';
import AuthHomeScreen from './screens/AuthHomeScreen'
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function HomeStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#333399",
        },
      }}
      mode='float'
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName='Search'
      screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#333399",
        },
      }}
      mode='float'
    >
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function AddStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName='Add'
      screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#333399",
        },
      }}
      mode='modal'
    >
      <Stack.Screen name="Add" component={AddScreen} />
    </Stack.Navigator>
  );
}

function FavoriteStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName='Favorite'
      screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#333399",
        }
      }}
      headerMode="float"
    >
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
    </Stack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
      screenOptions={{
        headerTintColor: "#ffffff",
        headerStyle: {
          backgroundColor: "#333399",
        }
      }}
      headerMode="float"
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
    </Stack.Navigator>
  );
}

// Auth Screen
function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='AuthHome'
      headerMode="none"
    >
      <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}

// BottomTab
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
              ? 'chat'
              : 'chat';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'settings'
              : 'settings';
          }
          return <Icon name={iconName} size={size} color={color} />;
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
      isAuth: false,
    };
  }

  componentDidMount() {
  }

  render() {
    const { isLoading, isAuth } = this.state;

    if (isLoading) {
      // We haven't finished checking for the token yet
      return <SplashScreen />;
    }

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          {isAuth && <BottomTabStack />}
          {!isAuth && <AuthNavigator />}
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
