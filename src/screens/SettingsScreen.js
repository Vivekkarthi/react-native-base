import React from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {List} from 'react-native-paper';

const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <View style={{flex: 1}}>
          <List.Section>
            <List.Subheader>Settings</List.Subheader>
            <List.Item
              title="Settings 1"
              left={() => <List.Icon icon="folder" />}
            />
            <List.Item
              title="Settings 2"
              left={() => <List.Icon color="#000" icon="folder" />}
            />
          </List.Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
