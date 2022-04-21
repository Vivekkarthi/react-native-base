import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PackagesScreen from '../screens/PackagesScreen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image, TouchableOpacity, View} from 'react-native';
import {logoutSuccess} from '../redux/actions/AuthState';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{
                  width: 185,
                  height: 88,
                }}
                imageStyle={{borderRadius: 25}}
              />
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 10,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={22} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const SettingStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SettingScreen"
        component={SettingsScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{
                  width: 185,
                  height: 88,
                }}
                imageStyle={{borderRadius: 25}}
              />
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 10,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={22} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const PackageStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PackageScreen"
        component={PackagesScreen}
        options={{
          headerTitle: () => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/icon.png')}
                style={{
                  width: 185,
                  height: 88,
                }}
                imageStyle={{borderRadius: 25}}
              />
            </View>
          ),
          headerLeft: () => (
            <View
              style={{
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 10,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={22} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: '#002060'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: 'yellow',
      }}>
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarStyle: {
            backgroundColor: '#002060',
          },
          tabBarIcon: ({color, size}) => (
            <Feather name="home" color={color} size={size} />
          ),
        })}
      />

      <Tab.Screen
        name="Packages"
        component={PackageStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Feather name="package" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
