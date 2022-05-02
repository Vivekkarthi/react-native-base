import React from 'react';
import {Text, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';

const SettingsScreen = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <ScrollView style={{padding: 10, marginTop: -15}}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          <Ionicons
            name="settings-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Lato-Regular',
                color: COLORS.primary,
              }}>
              {' '}
              Settings
            </Text>
          </Ionicons>
        </ScrollView>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default SettingsScreen;
