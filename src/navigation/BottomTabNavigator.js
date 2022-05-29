import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PackagesScreen from '../screens/PackagesScreen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image, TouchableOpacity, View, BackHandler, Alert} from 'react-native';
import {logoutSuccess} from '../redux/actions/AuthState';
import {COLORS} from '../constants';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      Alert.alert('DOORBOX App!', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => dispatch(logoutSuccess())},
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
          headerLeft: () => (
            <View
              style={{
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
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
      Alert.alert('DOORBOX App!', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => dispatch(logoutSuccess())},
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
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
          headerLeft: () => (
            <View
              style={{
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
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
      Alert.alert('DOORBOX App!', 'Are you sure you want to logout?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => dispatch(logoutSuccess())},
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Packages"
        component={PackagesScreen}
        options={{
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
          headerLeft: () => (
            <View
              style={{
                paddingLeft: 10,
              }}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={30} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ),
          headerRight: () => (
            <View
              style={{
                paddingRight: 16,
              }}>
              <TouchableOpacity onPress={() => logoutUser()}>
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const BottomTabNavigator = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('DOORBOX App!', 'Are you sure you want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Tab.Navigator
      backBehavior="HomeStack"
      initialRouteName={'HomeStack'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {backgroundColor: COLORS.primary},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#f17012',
      }}>
      <Tab.Screen
        name="SettingStack"
        component={SettingStack}
        options={{
          tabBarStyle: {display: 'none'},
          // tabBarLabel: 'Settings',
          // tabBarIcon: ({color, size}) => (
          //   <Feather name="settings" color={color} size={size} />
          // ),
        }}
      />

      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={({route}) => ({
          tabBarStyle: {display: 'none'},
          // tabBarLabel: 'Home',
          // tabBarIcon: ({color, size}) => (
          //   <Feather name="home" color={color} size={size} />
          // ),
        })}
      />

      <Tab.Screen
        name="PackageStack"
        component={PackageStack}
        options={{
          tabBarStyle: {display: 'none'},
          // tabBarLabel: 'Packages',
          // tabBarIcon: ({color, size}) => (
          //   <Feather name="package" color={color} size={size} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
