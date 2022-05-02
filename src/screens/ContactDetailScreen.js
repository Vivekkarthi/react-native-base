import React from 'react';
import {View, Text, TextInput, TextArea, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';
import SelectDropdown from 'react-native-select-dropdown';

const ContactDetailScreen = ({navigation, route}) => {
  const Category = ['Billing', 'Technical Support', 'Others'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 18}}>Contact Details</Text>

        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-end'}}>
          Go Back
        </Button>

        <View>
          <SelectDropdown
            data={Category}
            defaultValue={Category[1]}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {}}
            rowTextForSelection={(item, index) => {}}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={{
              height: 150,
              justifyContent: 'flex-end',
              textAlignVertical: 'top',
              fontSize: 16,
              backgroundColor: '#fff',
              padding: 20,
              marginTop: 50,
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
              width: 88,
            }}>
            Send
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
              backgroundColor: 'blue',
            }}>
            Cancel
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactDetailScreen;
