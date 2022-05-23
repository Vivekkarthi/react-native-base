import React, {useState} from 'react';
import {View, Text, TextInput, SafeAreaView} from 'react-native';
import {Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';
import {addNewTicket} from '../redux/actions/SupportTicketState';
import {useSelector} from 'react-redux';

const ContactDetailScreen = ({navigation, route}) => {
  const {loggedMember} = useSelector(state => state.AuthState);
  const [open, setOpen] = useState(false);
  const [supportValue, setSupportValue] = useState(null);
  const [supportTextValue, setSupportTextValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Billing', value: 1},
    {label: 'Technical Support', value: 2},
    {label: 'Others', value: 3},
  ]);
  const [supportError, setSupportError] = useState({
    success: 0,
    message: 'No Error Found.',
  });

  const onsubmit = () => {
    addNewTicket(loggedMember, supportValue, supportTextValue)
      .then(resp => {
        console.log('++++++++++++++++++++++++++++++++++', resp);
        if (resp === 'Success') {
          // setSupportError({
          //   success: 1,
          //   message: 'Ticket Created Successfully.',
          // });
          navigation.navigate('Contacts');
        } else {
          setSupportError({
            success: 2,
            message: 'Something went wrong, Please try again.',
          });
        }
      })
      .catch(e => console.log(e));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
      <View style={styles.MainContainer}>
        <Ionicons
          name="ios-people-outline"
          size={23}
          color={COLORS.primary}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text style={styles.f18}> Contact Details</Text>
        </Ionicons>

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
            value={supportValue}
            items={items}
            setOpen={setOpen}
            setValue={setSupportValue}
            setItems={setItems}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            value={supportTextValue}
            style={{
              height: 160,
              borderRadius: 8,
              textAlignVertical: 'top',
              fontSize: 16,
              backgroundColor: '#fff',
              padding: 20,
              marginTop: 5,
            }}
            onChangeText={setSupportTextValue}
          />
          {supportError.success !== 0 ? (
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'Lato-Regular',
                textAlign: 'center',
                color: '#D83F50',
              }}>
              {supportError.message}
            </Text>
          ) : null}
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            mode="contained"
            onPress={() => onsubmit()}
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
              backgroundColor: 'green',
              width: 88,
            }}>
            Save
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'flex-start',
              marginTop: 20,
              backgroundColor: '#f17012',
            }}>
            Cancel
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ContactDetailScreen;
