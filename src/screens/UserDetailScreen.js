import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const UserDetailScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Books Details</Text>

        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
