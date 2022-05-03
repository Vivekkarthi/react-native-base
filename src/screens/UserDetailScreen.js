import React from 'react';
import {View, Text, SafeAreaView, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';

const UserDetailScreen = ({navigation, route}) => {
  const Category = ['Billing', 'Technical Support', 'Others'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <View style={styles.MainContainer}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
        <Ionicons
          name="add-circle"
          size={23}
          color={COLORS.primary}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text style={styles.f18}>Add User</Text>
        </Ionicons>

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-end'}}>
          Go Back
        </Button>

        <View style={{flexDirection: 'column'}}>
          <TextInput
            style={{
              borderRadius: 8,
              textAlignVertical: 'top',
              fontSize: 16,
              backgroundColor: '#fff',
              padding: 20,
              marginTop: 5,
            }}
          />
          <TextInput
            style={{
              borderRadius: 8,
              textAlignVertical: 'top',
              fontSize: 16,
              backgroundColor: '#fff',
              padding: 20,
              marginTop: 5,
            }}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={{
              height: 160,
              borderRadius: 8,
              textAlignVertical: 'top',
              fontSize: 16,
              backgroundColor: '#fff',
              padding: 20,
              marginTop: 5,
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
              backgroundColor: 'red',
              width: 150,
            }}>
            Create
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;
