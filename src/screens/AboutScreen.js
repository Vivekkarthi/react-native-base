import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';

const AboutScreen = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: '#dfe1eb', marginTop: -15}}>
        <ScrollView style={{padding: 10}}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
          <Ionicons
            name="information-circle-outline"
            size={23}
            color={'#002060'}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Lato-Regular',
                color: '#002060',
              }}>
              About
            </Text>
          </Ionicons>
        </ScrollView>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default AboutScreen;
