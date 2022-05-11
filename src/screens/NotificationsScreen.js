import moment from 'moment';
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useToast} from 'react-native-toast-notifications';

import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {fetchHomeData, saveMemberHomeDetails} from '../redux/actions/HomeState';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import {Loader} from '../components/Loader';
import styles from '../styles/AppStyles';

const NotificationsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {loggedMember} = useSelector(state => state.AuthState);
  const {homeDetails} = useSelector(state => state.HomeState);
  const [loader, setLoader] = useState(true);
  const [notifyDate, setNotifyDate] = useState(new Date());

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

  const getNextNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).add(1, 'weeks'));
    getHomeData(moment(new Date(notifyDate)).add(1, 'weeks'));
  };

  const getPreviousNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).subtract(1, 'weeks'));
    getHomeData(moment(new Date(notifyDate)).subtract(1, 'weeks'));
  };

  useEffect(() => {
    getHomeData(
      homeDetails.Notifications.length
        ? homeDetails.Notifications[0].Datex
        : new Date(),
    );
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
          <View style={{flex: 1, paddingTop: 10}}>
            <Card style={{marginBottom: 5}}>
              <Card.Title
                title={moment(new Date(notifyDate)).format('MMMM DD, YYYY')}
                titleStyle={{fontSize: 18, alignSelf: 'center'}}
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
            {homeDetails.Notifications.length ? (
              <FlatList
                data={homeDetails.Notifications}
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
                          {moment(notification.item.Datex).format(
                            'MMMM DD, YYYY hh:mm:ss',
                          )}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#a3a3a3',
                            marginTop: 2,
                          }}>
                          {notification.item.Messagex}
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
