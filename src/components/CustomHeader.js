import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {logoutSuccess} from '../redux/actions/AuthState';

export default function CustomHeader({navigation}) {
  const dispatch = useDispatch();
  const logoutUser = async () => {
    try {
      await auth().signOut();
      dispatch(logoutSuccess());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        marginVertical: -12,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Ionicons name="menu" size={30} style={{top: 18}} />
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/icon.png')}
        style={{
          width: 185,
          height: 88,
          flexDirection: 'row',
          justifyContent: 'center',
          bottom: 10,
        }}
        imageStyle={{borderRadius: 25}}
      />
      <TouchableOpacity onPress={() => logoutUser()}>
        <Ionicons name="exit-outline" size={22} style={{top: 18}} />
      </TouchableOpacity>
    </View>
  );
}
