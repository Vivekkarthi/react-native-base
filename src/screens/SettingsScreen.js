import React from 'react';
import {Text, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 10, marginTop: -15}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        <Ionicons
          name="settings-outline"
          size={23}
          color={'#002060'}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: '#002060',
            }}>
            {' '}
            Settings
          </Text>
        </Ionicons>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
