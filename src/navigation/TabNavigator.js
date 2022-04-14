import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {logoutSuccess} from '../redux/actions/AuthState';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {View} from 'react-native';
import CreateAccount from '../screens/CreateAccount';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await auth().signOut();
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="DropBox Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: '#2e64e5',
              fontFamily: 'Kufam-SemiBoldItalic',
              fontSize: 18,
            },
            headerStyle: {
              shadowColor: '#fff',
              elevation: 0,
            },
            headerRight: () => (
              <View style={{marginRight: 10}}>
                <FontAwesome5.Button
                  name="power-off"
                  size={22}
                  backgroundColor="#fff"
                  color="#2e64e5"
                  onPress={() => logout()}
                />
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="GameDetails"
          component={GameDetailsScreen}
          options={({route}) => ({
            title: route.params?.title,
          })}
        />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccount} />
      </Stack.Navigator>
    </>
  );
};

const MessageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen name="Messages" component={MessagesScreen} />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: '#002060'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarStyle: {
            display: getTabBarVisibility(route),
            backgroundColor: '#002060',
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="Messages"
        component={MessageStack}
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'yellow'},
          tabBarIcon: ({color, size}) => (
            <Feather name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if (routeName == 'GameDetails') {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
