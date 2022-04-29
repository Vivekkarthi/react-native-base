import React from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';

const ProfileScreen = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: COLORS.background, marginTop: -15}}>
        <ScrollView style={{padding: 10}}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          <Ionicons
            name="ios-person-circle-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Lato-Regular',
                color: COLORS.primary,
              }}>
              Profile
            </Text>
          </Ionicons>
        </ScrollView>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default ProfileScreen;
