import React from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';

const UsersScreen = ({navigation, route}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        <Ionicons
          name="ios-people-outline"
          size={23}
          color={'#002060'}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: '#002060',
            }}>
            Users List
          </Text>
        </Ionicons>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            style={{margin: 5}}
            mode="contained"
            onPress={() => navigation.goBack()}>
            Go Back
          </Button>
          <Button
            style={{margin: 5}}
            mode="contained"
            onPress={() => navigation.navigate('UserDetails')}>
            Add
          </Button>
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default UsersScreen;
