import moment from 'moment';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {
  fetchNotifyData,
  saveMemberNotificationDetails,
} from '../redux/actions/NotificationState';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import {Loader} from '../components/Loader';
import styles from '../styles/AppStyles';

const NotificationsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const {loggedMember} = useSelector(state => state.AuthState);
  const {notificationDetails} = useSelector(state => state.NotificationState);
  const [loader, setLoader] = useState(true);
  const [notifyDate, setNotifyDate] = useState({
    fromDate: new Date(),
    toDate: new Date().setDate(new Date().getDate() + 7),
  });

  const getNotifyData = useCallback(
    (currentDate, toDate) => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      const convertToDate = moment(toDate).format('YYYY-MM-DD');
      fetchNotifyData(loggedMember.ControllerID, convertDate, convertToDate)
        .then(async resp => {
          dispatch(saveMemberNotificationDetails(resp));
          setLoader(false);
        })
        .catch(error => {
          setLoader(false);
          Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
        });
    },
    [dispatch, loggedMember.ControllerID],
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
    getNotifyData(now, moment(now).add(1, 'weeks'));
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
    getNotifyData(moment(now).subtract(1, 'weeks'), now);
  };

  useEffect(() => {
    getNotifyData(notifyDate.fromDate, notifyDate.toDate);
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
          <Ionicons
            name="notifications"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Notifications</Text>
          </Ionicons>
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
                  color: '#0059b3',
                }}
                // subtitleStyle={{fontSize: 16, alignSelf: 'center'}}
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
            {notificationDetails.length ? (
              <FlatList
                data={notificationDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={notification => (
                  <View
                    style={{
                      maxWidth: '100%',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: '#fff',
                      marginVertical: 4,
                      borderRadius: 4,
                      borderLeftColor: getColorCode(
                        notification.item.MessageID,
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
                            notification.item.MessageID,
                          ),
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: 10,
                          width: '65%',
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#333',
                            fontWeight: 'bold',
                          }}>
                          {notification.item.Messagex}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#a3a3a3',
                            marginTop: 2,
                          }}>
                          {notification.item.Datex}
                        </Text>
                      </View>
                      <View
                        style={{
                          alignSelf: 'center',
                          width: '35%',
                        }}>
                        <Text
                          style={{
                            textAlign: 'left',
                            color: COLORS.primary,
                          }}>
                          {getTypeOfMsg(notification.item.MessageID)}
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

export default NotificationsScreen;
