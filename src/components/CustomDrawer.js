import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch, useSelector} from 'react-redux';
import {logoutSuccess} from '../redux/actions/AuthState';
import {isEmpty} from 'lodash';

const CustomDrawer = props => {
  const {loggedMember} = useSelector(state => state.AuthState);
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      Alert.alert('DOORBOX App!', 'Are you sure, you want to logout?', [
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
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#ccc'}}>
        {!isEmpty(loggedMember) && (
          <>
            <Image
              source={require('../../assets/images/icon.png')}
              style={{
                marginLeft: 14,
                height: 100,
                width: 180,
                borderRadius: 40,
              }}
            />
            <Text
              style={{
                marginLeft: 20,
                color: '#0059b3',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                fontWeight: 'bold',
                marginBottom: 5,
              }}>
              Name: {loggedMember.LoginNAME}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                color: '#000',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
              }}>
              Controller: {loggedMember.ControllerName}
            </Text>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: '#ccc',
              }}></View>
          </>
        )}
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          style={{paddingVertical: 30}}
          onPress={() => logoutUser()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'#f17012'} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
                fontWeight: 'bold',
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
