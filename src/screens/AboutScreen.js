import React from 'react';
import {View, SafeAreaView, ScrollView, Text} from 'react-native';

const AboutScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <View style={{flex: 1}}>
          <Text>About Screen</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutScreen;
