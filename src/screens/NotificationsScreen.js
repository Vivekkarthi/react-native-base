import moment from 'moment';
import React, {useState, useCallback} from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useToast} from 'react-native-toast-notifications';

import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {fetchHomeData, saveMemberHomeDetails} from '../redux/actions/HomeState';
import {Loader} from '../components/Loader';

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
    setNotifyDate(moment(new Date(notifyDate)).add(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).add(1, 'days'));
  };

  const getPreviousNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).subtract(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).subtract(1, 'days'));
  };

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          padding: 5,
          backgroundColor: '#dfe1eb',
        }}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        {loader ? <Loader /> : null}
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
                    borderLeftColor: '#ff3300',
                    borderLeftWidth: 6,
                    justifyContent: 'center',
                    paddingLeft: 16,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <Avatar.Icon
                      size={42}
                      color={COLORS.white}
                      icon="notification-clear-all"
                      style={{backgroundColor: '#ff3300'}}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        marginLeft: 10,
                        width: '75%',
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: '#333',
                          fontWeight: 'bold',
                        }}>
                        {moment(notification.item.Datex).format(
                          'MMMM DD, YYYY',
                        )}
                      </Text>
                      <Text
                        style={{fontSize: 16, color: '#a3a3a3', marginTop: 2}}>
                        {notification.item.Messagex}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignSelf: 'center',
                        marginLeft: 10,
                        backgroundColor: '#0DA728',
                        borderRadius: 50,
                        height: 10,
                        width: 10,
                      }}></View>
                  </View>
                </View>
              )}
            />
          ) : (
            <View
              style={{
                maxWidth: '100%',
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: '#fff',
                marginVertical: 4,
                borderRadius: 4,
                borderLeftColor: '#ff3300',
                borderLeftWidth: 6,
                justifyContent: 'center',
                paddingLeft: 16,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Avatar.Icon
                  size={42}
                  color={COLORS.white}
                  icon="notification-clear-all"
                  style={{backgroundColor: COLORS.primary}}
                />
                <View style={{alignSelf: 'center', marginLeft: 10}}>
                  <Text style={{fontSize: 16, color: '#a3a3a3', marginTop: 2}}>
                    No notifications found.
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default NotificationsScreen;
