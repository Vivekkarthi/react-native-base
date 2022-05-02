import React, {useState} from 'react';
import {View, Text, TextInput, TextArea, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const ContactDetailScreen = ({navigation, route}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Billing', value: 'billing'},
    {label: 'Technical Support', value: 'technicalSupport'},
    {label: 'Others', value: 'others'},
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
      <View style={{flex: 1, padding: 10}}>
        <Text style={{fontSize: 18}}>Contact Details</Text>

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-end'}}>
          Go Back
        </Button>

        <View style={{flexDirection: 'column'}}>
          <DropDownPicker
            style={{
              marginTop: 5,
            }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
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
