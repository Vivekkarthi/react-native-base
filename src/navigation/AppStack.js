import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import UsersScreen from '../screens/UsersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import InformationScreen from '../screens/InformationScreen';
import AboutScreen from '../screens/AboutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CustomDrawer from '../components/CustomDrawer';
import {logoutSuccess} from '../redux/actions/AuthState';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../constants';
import UserDetailScreen from '../screens/UserDetailScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UserStack = ({navigation}) => {
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
        name="Users"
        component={UsersScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: '#002060',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Ionicons name="notifications" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Users"
        component={UserStack}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="users" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="settings" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="camera" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="user" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="info" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Information"
        component={InformationScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="alert-circle" size={22} color={color} />
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                width: 185,
                height: 88,
              }}
              imageStyle={{borderRadius: 25}}
            />
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#ff3300'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default AppStack;
