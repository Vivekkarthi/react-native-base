import React, {useCallback, useEffect} from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationsScreen from '../screens/NotificationsScreen';
import MobileNotificationsScreen from '../screens/MobileNotificationsScreen';
import UsersScreen from '../screens/UsersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PackagesScreen from '../screens/PackagesScreen';
import PackageDetailScreen from '../screens/PackageDetailScreen';
import MyboxScreen from '../screens/MyboxScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import ContactScreen from '../screens/ContactScreen';
import CustomDrawer from '../components/CustomDrawer';
import {logoutSuccess} from '../redux/actions/AuthState';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../constants';
import UserDetailScreen from '../screens/UserDetailScreen';
import {
  saveURLDetails,
  memberManualURL,
} from '../redux/actions/SupportTicketState';
import {useToast} from 'react-native-toast-notifications';
import {Linking} from 'react-native';

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

const ContactStack = ({navigation}) => {
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
        name="Contacts"
        component={ContactScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ContactDetails"
        component={ContactDetailScreen}
        options={{
          headerShown: false,
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
        name="Packages"
        component={PackagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PackageDetails"
        component={PackageDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const {URLDetails} = useSelector(state => state.TicketStateState);
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutUser = async () => {
    try {
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };

  const getManualURLData = useCallback(
    (currentDate, toDate) => {
      //setLoader(true);
      memberManualURL()
        .then(async resp => {
          dispatch(saveURLDetails(resp));
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          toast.show(error.message, {
            type: 'custom_type',
            animationDuration: 100,
            data: {
              type: 'error',
              title: 'Invalid data',
            },
          });
        });
    },
    [dispatch, toast],
  );

  useEffect(() => {
    getManualURLData();
  }, []);
  //console.log('getManualURLData', URLDetails);

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: COLORS.primary,
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
        name="Images"
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="My DoorBox"
        component={MyboxScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="box" size={22} color={color} />
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="   Mobile Notifications"
        component={MobileNotificationsScreen}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Foundation
              name="mobile-signal"
              size={24}
              color={color}
              style={{left: 6}}
            />
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Delivery"
        component={PackageStack}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="package" size={22} color={color} />
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactStack}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="file" size={22} color={color} />
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
                <Ionicons name="exit-outline" size={27} color={'#f17012'} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="User Manual"
        component={() => Linking.openURL(URLDetails)}
        // component={null}
        options={{
          headerShown: true,
          drawerIcon: ({color}) => (
            <Feather name="file" size={22} color={color} />
          ),
        }}
      />
      {/* <Ionicons
        name="ios-people-outline"
        size={23}
        color={COLORS.primary}
        style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
        <Text> Contact Us</Text>
      </Ionicons> */}
    </Drawer.Navigator>
  );
};
export default AppStack;
