import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import TabNavigator from './TabNavigator';
import CustomDrawer from '../components/CustomDrawer';
import NotificationsScreen from '../screens/NotificationsScreen';
import UsersScreen from '../screens/UsersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';

const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
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
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="notifications" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Users"
        component={UsersScreen}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="users" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="settings" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="camera" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="user" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="info" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Information"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Feather name="info" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default AuthStack;
