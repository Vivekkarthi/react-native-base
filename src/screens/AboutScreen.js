import React from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';

const AboutScreen = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          <Ionicons
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}
            name="information-circle-outline"
            size={23}
            color={COLORS.primary}>
            <Text style={styles.f18}>About</Text>
          </Ionicons>
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default AboutScreen;
