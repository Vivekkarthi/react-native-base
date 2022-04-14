import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';

const NotificationsScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <CustomHeader navigation={navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Notifications Screen</Text>
          <Text>{route.params?.title}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
