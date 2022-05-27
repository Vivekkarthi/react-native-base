import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';
import styles from '../styles/AppStyles';
import {addNewTicket} from '../redux/actions/SupportTicketState';
import {useSelector} from 'react-redux';
import {getColorCode} from '../utils/Handlers';
import {isEmpty} from 'lodash';

const ContactDetailScreen = ({navigation, route}) => {
  const hasSupportData = route.params && route.params.state;
  const {loggedMember} = useSelector(state => state.AuthState);
  const {ticketResponseDetails} = useSelector(state => state.TicketStateState);
  const [btnDisable, setBtnDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const [supportValue, setSupportValue] = useState(
    !isEmpty(hasSupportData) ? hasSupportData.SCID : null,
  );

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
    setBtnDisable(false);
    addNewTicket(loggedMember, supportValue, supportTextValue, hasSupportData)
      .then(resp => {
        if (resp === 'Success') {
          setBtnDisable(true);
          navigation.navigate('Contacts', {reload: true});
        } else {
          setBtnDisable(true);
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
        {!isEmpty(hasSupportData) && (
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={ticketResponseDetails}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={support => (
                    <TouchableOpacity
                      style={[
                        support.item.TypeX && support.item.TypeX === 1
                          ? {
                              borderRightWidth: 6,
                              borderRightColor: getColorCode(
                                isEmpty(hasSupportData)
                                  ? 1
                                  : hasSupportData.SCID,
                              ),
                            }
                          : {
                              borderLeftWidth: 6,
                              borderLeftColor: getColorCode(
                                isEmpty(hasSupportData)
                                  ? 1
                                  : hasSupportData.SCID,
                              ),
                            },
                        {
                          maxWidth: '100%',
                          paddingHorizontal: 15,
                          paddingVertical: 10,
                          backgroundColor: '#fff',
                          marginVertical: 4,
                          borderRadius: 4,
                          justifyContent: 'center',
                          paddingLeft: 8,
                        },
                      ]}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flexDirection: 'column',
                            marginLeft: 5,
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#333',
                              fontWeight: 'bold',
                            }}>
                            Message: {support.item.Message}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: COLORS.primary,
                              marginTop: 2,
                            }}>
                            Date: {support.item.sDateX}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        )}
        <View>
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
            disabled={!isEmpty(hasSupportData) ? true : false}
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 5,
          }}>
          <Button
            mode="contained"
            onPress={() => onsubmit()}
            disabled={btnDisable}
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
