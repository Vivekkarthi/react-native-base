import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PackagesScreen from '../screens/PackagesScreen';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const SettingStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SettingScreen"
      component={SettingsScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const PackageStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="PackageScreen"
      component={PackagesScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

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
