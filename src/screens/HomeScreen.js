import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, Text, FlatList, RefreshControl} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import {useSelector, useDispatch} from 'react-redux';
import {
  callOpenCloseBox,
  fetchHomeData,
  saveMemberHomeDetails,
} from '../redux/actions/HomeState';
import {Card, Avatar} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';

import {Loader} from '../components/Loader';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import styles from '../styles/AppStyles';
import {NotificationUI} from '../components/NotificationUI';

import {fetchNotifyData} from '../redux/actions/MobileNotificationState';

export default function HomeScreen({navigation, route}) {
  const dispatch = useDispatch();
  const toast = useToast();
  const {loggedMember} = useSelector(state => state.AuthState);
  const {homeDetails} = useSelector(state => state.HomeState);

  const [loader, setLoader] = useState(true);
  const [notificationData, setNotificationData] = useState([]);
  const [notifyDate, setNotifyDate] = useState(new Date());
  const [mobileNotifyDate, setMobileNotifyDate] = useState({
    fromDate: new Date(),
    toDate: new Date(),
  });
  const [refreshing, setRefreshing] = useState(false);

  const getHomeData = useCallback(
    currentDate => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      fetchHomeData(
        loggedMember.LoginID,
        loggedMember.ControllerID,
        convertDate,
      )
        .then(async resp => {
          if (resp.LastSyncDate) {
            //Good
            dispatch(saveMemberHomeDetails(resp));
            setLoader(false);
          } else {
            // Not Good
            setLoader(false);
            toast.show(resp, {
              type: 'custom_type',
              animationDuration: 100,
              data: {
                type: 'error',
                title: 'Invalid data',
              },
            });
          }
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
    [dispatch, loggedMember.ControllerID, loggedMember.LoginID, toast],
  );

  const getNotifyData = useCallback(
    (currentDate, toDate) => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      const convertToDate = moment(toDate).format('YYYY-MM-DD');
      fetchNotifyData(loggedMember.CustID, convertDate, convertToDate)
        .then(async resp => {
          if (resp && resp.length) {
            setNotificationData(resp);
          } else {
            setNotificationData([]);
          }
          // dispatch(saveMemberMobileNotificationDetails(resp));
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
    [loggedMember.CustID, toast],
  );

  const getNextNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).add(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).add(1, 'days'));
  };

  const getPreviousNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).subtract(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).subtract(1, 'days'));
  };

  const toggleLockTheBox = packIsLocked => {
    setLoader(true);
    callOpenCloseBox(
      loggedMember.LoginID,
      loggedMember.ControllerID,
      packIsLocked,
    )
      .then(async resp => {
        if (resp === 'SUCCESS-1' || resp === 'SUCCESS-2') {
          //Good
          homeDetails['PackageState'] = packIsLocked;
          dispatch(saveMemberHomeDetails(homeDetails));
          setLoader(false);
        } else {
          // Not Good
          setLoader(false);
          toast.show(resp, {
            type: 'custom_type',
            animationDuration: 100,
            data: {
              type: 'error',
              title: 'Invalid data',
            },
          });
        }
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
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setNotifyDate(moment(new Date()));
    getHomeData(new Date());
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getHomeData(notifyDate);
    getNotifyData(mobileNotifyDate.fromDate, mobileNotifyDate.toDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const intervalCall = setInterval(() => {
  //     console.log(
  //       '*******************************************************',
  //       moment(notifyDate).format('YYYY-MM-DD'),
  //     );
  //     fetchHomeData(
  //       loggedMember.LoginID,
  //       loggedMember.ControllerID,
  //       moment(notifyDate).format('YYYY-MM-DD'),
  //     ).then(async resp => {
  //       if (resp.LastSyncDate) {
  //         dispatch(saveMemberHomeDetails(resp));
  //       }
  //     });
  //   }, 1000 * homeDetails.MobileAppPageRefreshInterval);

  //   return () => {
  //     // clean up
  //     clearInterval(intervalCall);
  //   };
  // }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Text
            style={{
              alignSelf: 'flex-end',
              fontWeight: 'bold',
              color: '#178b93',
              fontSize: 18,
              marginRight: 8,
            }}>
            Welcome {loggedMember.LoginNAME}
          </Text>
          <Ionicons
            name="ios-home-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Home</Text>
          </Ionicons>
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={[COLORS.secondary, COLORS.white]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={item => (
              <>
                <View
                  style={{
                    paddingTop: 10,
                    paddingBottom: 10,
                    flexDirection: 'row',
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Card
                      onPress={() =>
                        toggleLockTheBox(homeDetails.PackageState === 1 ? 2 : 1)
                      }
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 18,
                          backgroundColor: '#178b93',
                          paddingBottom: 10,
                          paddingTop: 9,
                          color: COLORS.white,
                        }}>
                        <Feather name="box" size={22} /> Box Status
                      </Text>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: 90,
                          height: 85,
                          top: 10,
                        }}
                        source={
                          homeDetails.PackageState === 1
                            ? require('../../assets/images/new_lock.png')
                            : require('../../assets/images/new_unlock.jpg')
                        }
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000000',
                          fontWeight: 'bold',
                          top: 10,
                          lineHeight: 35,
                        }}>
                        {/* {moment(homeDetails.LastSyncDate).format(
                          'MMMM DD, YYYY hh:mm:ss',
                        )} */}
                        {homeDetails.LastSyncDate}
                      </Text>
                      <Text
                        style={{
                          textAlign: 'center',
                          top: 10,
                          color:
                            homeDetails.PackageState === 1
                              ? '#0DA728'
                              : '#D83F50',
                          fontWeight: 'bold',
                        }}>
                        {homeDetails.PackageState === 1 ? 'Locked' : 'Unlocked'}
                      </Text>
                    </Card>
                    <Card
                      onPress={() => navigation.navigate('Images')}
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 18,
                          backgroundColor: '#178b93',
                          color: COLORS.white,
                          paddingBottom: 10,
                          paddingTop: 9,
                        }}>
                        <Feather name="camera" size={22} /> Internal Camera
                      </Text>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: '100%',
                          height: 170,
                          resizeMode: 'contain',
                        }}
                        source={
                          homeDetails.Photos && homeDetails.Photos.length
                            ? {
                                uri: homeDetails.Photos[0].Filename,
                              }
                            : require('../../assets/images/no-image.jpg')
                        }
                      />
                      <Text
                        style={{
                          textAlign: 'center',
                          color: '#000000',
                          fontWeight: 'bold',
                          lineHeight: 35,
                        }}>
                        {homeDetails.Photos && homeDetails.Photos.length
                          ? homeDetails.Photos[0].DateTimeX
                          : ''}
                      </Text>
                    </Card>
                  </View>
                </View>
                <NotificationUI
                  mobileNotifyDate={mobileNotifyDate}
                  setMobileNotifyDate={setMobileNotifyDate}
                  notificationData={notificationData}
                  getNotifyData={getNotifyData}
                />
                <Card style={{marginBottom: 13, marginTop: 2}}>
                  <View
                    style={{
                      alignSelf: 'center',
                      paddingBottom: 12,
                      paddingTop: 12,
                      backgroundColor: '#178b93',
                      width: '100%',
                    }}>
                    <Ionicons
                      name="notifications"
                      size={16}
                      style={{textAlign: 'center', justifyContent: 'center'}}
                      color={COLORS.white}>
                      {' '}
                      Notifications
                    </Ionicons>
                  </View>
                  <Card.Title
                    title={moment(new Date(notifyDate)).format('MMMM DD, YYYY')}
                    // subtitle={'subtitle'}
                    titleStyle={{fontSize: 16, alignSelf: 'center'}}
                    subtitleStyle={{fontSize: 16, alignSelf: 'center'}}
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
                {homeDetails.Notifications &&
                homeDetails.Notifications.length ? (
                  <FlatList
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    data={homeDetails.Notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={notification => (
                      <View
                        style={{
                          maxWidth: '100%',
                          bottom: 13,
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
                              {/* {moment(notification.item.Datex).format(
                                      'MMMM DD, YYYY hh:mm:ss',
                                    )} */}
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
                  <Card style={{backgroundColor: '#eef1f6', bottom: 10}}>
                    <Card.Title
                      title={'No notifications found.'}
                      titleStyle={{fontSize: 14}}
                    />
                  </Card>
                )}
              </>
            )}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
}
