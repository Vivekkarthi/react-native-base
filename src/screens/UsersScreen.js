import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {DataTable} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';

const UsersScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <Ionicons name="arrow-back" size={22} style={{left: 310}} />
        <Ionicons name="add" size={22} style={{left: 350, bottom: 25}} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title numeric>Phone</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>John Doe</DataTable.Cell>
              <DataTable.Cell>johndoe@example.com</DataTable.Cell>
              <DataTable.Cell numeric>0488851777</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Mark</DataTable.Cell>
              <DataTable.Cell>markjoes@example.com</DataTable.Cell>
              <DataTable.Cell numeric>0412345789</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen;