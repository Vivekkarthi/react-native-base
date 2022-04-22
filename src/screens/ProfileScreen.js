import React from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        <View style={{flex: 1}}>
          <Text>About Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
