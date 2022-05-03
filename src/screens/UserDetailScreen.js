import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';

const UserDetailScreen = ({navigation, route}) => {
  const Category = ['Billing', 'Technical Support', 'Others'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <View style={styles.MainContainer}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.f18}>Users Details</Text>

          <Button mode="contained" onPress={() => navigation.goBack()}>
            Go Back
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
