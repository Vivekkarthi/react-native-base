import React from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';

const InformationScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <View style={{flex: 1}}>
          <Text>Information Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InformationScreen;
