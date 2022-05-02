import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
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
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#ff651f'}}>
        {!isEmpty(loggedMember) && (
          <>
            <Image
              source={require('../../assets/images/user.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                marginBottom: 10,
              }}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontFamily: 'Roboto-Medium',
                marginBottom: 5,
              }}>
              {loggedMember.LoginNAME}
            </Text>
          </>
        )}
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          style={{paddingVertical: 15}}
          onPress={() => logoutUser()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={'#f17012'} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 5,
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
