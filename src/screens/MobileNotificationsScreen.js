import moment from 'moment';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {useToast} from 'react-native-toast-notifications';

import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {
  fetchMobileNotifyData,
  saveMemberMobileNotificationDetails,
} from '../redux/actions/MobileNotificationState';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import {Loader} from '../components/Loader';
import styles from '../styles/AppStyles';

const MobileNotificationsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {loggedMember} = useSelector(state => state.AuthState);
  const {mobilenotificationDetails} = useSelector(
    state => state.MobileNotificationState,
  );
  const [loader, setLoader] = useState(true);
  const [notifyDate, setNotifyDate] = useState({
    fromDate: new Date(),
    toDate: new Date().setDate(new Date().getDate() + 7),
  });

  const getMobileNotifyData = useCallback(
    (currentDate, toDate) => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      const convertToDate = moment(toDate).format('YYYY-MM-DD');
      fetchMobileNotifyData(loggedMember.CustID, convertDate, convertToDate)
        .then(async resp => {
          // if (resp && resp.length) {
          //   setNotificationData(resp);
          // }
          dispatch(saveMemberMobileNotificationDetails(resp));
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
    getMobileNotifyData(now, moment(now).add(1, 'weeks'));
  };

  const getPreviousNotify = () => {
    setNotifyDate(prevState => ({
      ...prevState,
      toDate: notifyDate.fromDate,
      fromDate: moment(new Date(notifyDate.fromDate)).subtract(1, 'weeks'),
    }));
    getMobileNotifyData(
      moment(new Date(notifyDate.fromDate)).subtract(1, 'weeks'),
      notifyDate.fromDate,
    );
  };

  useEffect(() => {
    getMobileNotifyData(notifyDate.fromDate, notifyDate.toDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
        }}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Foundation
            name="mobile-signal"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Mobile Notifications</Text>
          </Foundation>
          <View style={{flex: 1, paddingTop: 19}}>
            <Card style={{marginBottom: 5}}>
              <Card.Title
                title={`${moment(new Date(notifyDate.fromDate)).format(
                  'MMMM DD, YYYY',
                )} - ${moment(new Date(notifyDate.toDate)).format(
                  'MMMM DD, YYYY',
                )}`}
                // subtitle={moment(new Date(notifyDate.toDate)).format('MMMM DD, YYYY')}
                titleStyle={{
                  fontSize: 14,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                // subtitleStyle={{fontSize: 12, alignSelf: 'center'}}
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
            {mobilenotificationDetails.length ? (
              <FlatList
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                data={mobilenotificationDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={mobilenotification => (
                  <View
                    style={{
                      maxWidth: '100%',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: '#fff',
                      marginVertical: 4,
                      borderRadius: 4,
                      borderLeftColor: getColorCode(
                        mobilenotification.item.STATUSX,
                      ),
                      borderLeftWidth: 6,
                      justifyContent: 'center',
                      paddingLeft: 16,
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Avatar.Icon
                        size={42}
                        color={COLORS.white}
                        icon="notification-clear-all"
                        style={{
                          backgroundColor: getColorCode(
                            mobilenotification.item.STATUSX,
                          ),
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#333',
                            fontWeight: 'bold',
                          }}>
                          {mobilenotification.item.MsgTitle}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#333',
                          }}>
                          {mobilenotification.item.MessageX}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#a3a3a3',
                            marginTop: 2,
                          }}>
                          {mobilenotification.item.DateX}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              />
            ) : (
              <Card style={{backgroundColor: '#eef1f6'}}>
                <Card.Title
                  title={'No notifications found.'}
                  titleStyle={{fontSize: 14}}
                />
              </Card>
            )}
          </View>
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default MobileNotificationsScreen;
