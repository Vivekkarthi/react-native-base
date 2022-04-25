import React from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const InformationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 10}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        <Ionicons
          name="help-circle-outline"
          size={23}
          color={'#002060'}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: '#002060',
            }}>
            Information
          </Text>
        </Ionicons>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationScreen;
