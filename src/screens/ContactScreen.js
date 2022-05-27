import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Button} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import {getColorCode} from '../utils/Handlers';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {Card} from 'react-native-paper';
import moment from 'moment';
import styles from '../styles/AppStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchTicketData,
  fetchTicketResponseData,
  saveTicketDetails,
  saveTicketResponseDetails,
} from '../redux/actions/SupportTicketState';
import {useToast} from 'react-native-toast-notifications';
import {Loader} from '../components/Loader';
import {Linking} from 'react-native';

const ContactScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {loggedMember} = useSelector(state => state.AuthState);
  const {ticketDetails} = useSelector(state => state.TicketStateState);
  const [loader, setLoader] = useState(true);
  const [notifyDate, setNotifyDate] = useState({
    fromDate: new Date(),
    toDate: new Date().setDate(new Date().getDate() + 7),
  });

  const getTicketResponseData = useCallback(
    ticketData => {
      setLoader(true);
      fetchTicketResponseData(ticketData.STID)
        .then(async resp => {
          dispatch(saveTicketResponseDetails(resp));
          setLoader(false);
          navigation.navigate('ContactDetails', {
            state: ticketData,
          });
        })
        .catch(error => {
          setLoader(false);
          toast.show(error.massage, {
            type: 'custom_type',
            animationDuration: 100,
            data: {
              type: 'error',
              title: 'Invalid data',
            },
          });
        });
    },
    [dispatch, navigation, toast],
  );

  const getTicketsData = useCallback(
    (currentDate, toDate) => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      const convertToDate = moment(toDate).format('YYYY-MM-DD');
      fetchTicketData(loggedMember.CustID, convertDate, convertToDate)
        .then(async resp => {
          dispatch(saveTicketDetails(resp));
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          toast.show(error.message, {
            type: 'custom_type',
            animationDuration: 100,
            data: {
              type: 'error',
              title: 'Invalid data',
            },
          });
        });
    },
    [dispatch, loggedMember.CustID, toast],
  );

  const getNextNotify = () => {
    let numDays = 1;
    let now = new Date(notifyDate.toDate);
    now.setDate(now.getDate() + numDays);
    setNotifyDate(prevState => ({
      ...prevState,
      fromDate: now,
      toDate: moment(now).add(1, 'weeks'),
    }));
    getTicketsData(now, moment(now).add(1, 'weeks'));
  };

  const getPreviousNotify = () => {
    let numDays = 1;
    let now = new Date(notifyDate.fromDate);
    now.setDate(now.getDate() - numDays);
    setNotifyDate(prevState => ({
      ...prevState,
      toDate: now,
      fromDate: moment(now).subtract(1, 'weeks'),
    }));
    getTicketsData(moment(now).subtract(1, 'weeks'), now);
  };

  useEffect(() => {
    getTicketsData(notifyDate.fromDate, notifyDate.toDate);
  }, [getTicketsData, route.params, notifyDate.fromDate, notifyDate.toDate]);

  // const [supportType, setSupportType] = useState([
  //   {id: 1, name: 'Billing'},
  //   {id: 2, name: 'Technical Support'},
  //   {id: 3, name: 'Others'},
  // ]);
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Ionicons
            name="ios-people-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Contact Us</Text>
          </Ionicons>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <Button
              style={{margin: 5}}
              mode="contained"
              onPress={() => Linking.openURL('http://doorbox.ai/')}>
              Manual
            </Button>
            <Button
              style={{margin: 5}}
              mode="contained"
              onPress={() => navigation.navigate('ContactDetails')}>
              Add
            </Button>
          </View>
          <Card style={{marginBottom: 5}}>
            <Card.Title
              title={`${moment(new Date(notifyDate.fromDate)).format(
                'MMMM DD, YYYY',
              )} - ${moment(new Date(notifyDate.toDate)).format(
                'MMMM DD, YYYY',
              )}`}
              // subtitle={moment(new Date(notifyDate.toDate)).format('MMMM DD, YYYY')}
              titleStyle={{fontSize: 14, alignSelf: 'center'}}
              subtitleStyle={{fontSize: 14, alignSelf: 'center'}}
              left={props => (
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={30}
                  onPress={() => getPreviousNotify()}
                />
              )}
              right={props => (
                <Ionicons
                  style={{paddingRight: 12}}
                  name="arrow-forward-circle-outline"
                  size={30}
                  onPress={() => getNextNotify()}
                />
              )}
            />
          </Card>

          {ticketDetails.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={ticketDetails}
              keyExtractor={(item, index) => index.toString()}
              renderItem={support => (
                <TouchableOpacity
                  style={{
                    maxWidth: '100%',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: '#fff',
                    marginVertical: 4,
                    borderRadius: 4,
                    borderLeftColor: getColorCode(support.item.SCID),
                    borderLeftWidth: 6,
                    justifyContent: 'center',
                    paddingLeft: 8,
                  }}
                  onPress={() => {
                    getTicketResponseData(support.item);
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Avatar.Icon
                      size={42}
                      color={COLORS.white}
                      icon="notification-clear-all"
                      style={{
                        alignSelf: 'center',
                        backgroundColor: getColorCode(support.item.SCID),
                      }}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 5,
                        width: '50%',
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
                          fontSize: 14,
                          color: '#a3a3a3',
                          marginTop: 2,
                        }}>
                        Ticket: {support.item.TicketName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#a3a3a3',
                          marginTop: 2,
                        }}>
                        Status: {support.item.StatusX === 1 ? 'Open' : 'Close'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        width: '40%',
                        marginRight: 5,
                      }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: '#333',
                        }}>
                        Category: {support.item.SCDesc}
                      </Text>

                      <Text
                        style={{
                          fontSize: 12,
                          color: COLORS.primary,
                          marginTop: 2,
                        }}>
                        {support.item.sLastUpdatedDate}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <Card style={{backgroundColor: '#eef1f6'}}>
              <Card.Title
                title={'No tickets found.'}
                titleStyle={{fontSize: 14}}
              />
            </Card>
          )}
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default ContactScreen;
