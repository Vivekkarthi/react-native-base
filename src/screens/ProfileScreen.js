import React from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 10}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        <Ionicons
          name="ios-person-circle-outline"
          size={23}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text style={{fontSize: 18, fontFamily: 'Lato-Regular'}}>
            Profile
          </Text>
        </Ionicons>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
