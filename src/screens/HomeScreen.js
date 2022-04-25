import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';

import {useSelector, useDispatch} from 'react-redux';
import {fetchHomeData, saveMemberHomeDetails} from '../redux/actions/HomeState';
import {Card, Title, Paragraph} from 'react-native-paper';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';
// import Config from 'react-native-config';
import {Loader} from '../components/Loader';
import {CONFIG} from '../utils/Config';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loader, setLoader] = useState(true);
  const {loggedMember} = useSelector(state => state.AuthState);
  const {homeDetails} = useSelector(state => state.HomeState);
  const [notify, setNotify] = useState({
    activeNotification: 0,
    date: moment(new Date()).format('MMMM DD, YYYY'),
    title: 'No Message',
  });

  const getNextNotify = () => {
    const arr = homeDetails.Notifications.length;
    let idx = notify.activeNotification + 1;
    idx = idx % arr;

    setNotify({
      activeNotification: idx,
      date: homeDetails.Notifications[idx].Datex,
      title: homeDetails.Notifications[idx].Messagex,
    });
  };

  const getPreviousNotify = () => {
    const arr = homeDetails.Notifications.length;
    let idx = notify.activeNotification;

    if (idx === 0) {
      idx = arr - 1;
    } else {
      idx = idx - 1;
    }

    setNotify({
      activeNotification: idx,
      date: homeDetails.Notifications[idx].Datex,
      title: homeDetails.Notifications[idx].Messagex,
    });
  };

  useEffect(() => {
    // dispatch(fetchHomeData(loggedMember.ControllerID));
    fetchHomeData('newcontroller2')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 10}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        {loader ? <Loader /> : null}
        <Ionicons
          name="ios-home-outline"
          size={23}
          color={'#002060'}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: '#002060',
            }}>
            Home
          </Text>
        </Ionicons>

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
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Card.Cover
                style={{alignSelf: 'center', width: 160, height: 150}}
                source={
                  homeDetails.PackageState === 1
                    ? require('../../assets/images/new_lock.png')
                    : require('../../assets/images/unlock.jpg')
                }
              />
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {moment(homeDetails.LastSyncDate).format(
                  'MMMM DD, YYYY hh:mm:ss',
                )}
              </Text>
              <Text style={{textAlign: 'center'}}>
                {homeDetails.PackageState === 1 ? 'Locked' : 'UnLocked'}
              </Text>
            </Card>
            <Card
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Card.Cover
                style={{alignSelf: 'center', width: 160, height: 150}}
                source={{
                  uri: `${CONFIG.IMAGE_URL}/${homeDetails.photo1}`,
                }}
              />
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                Last Updated
              </Text>
            </Card>
          </View>
        </View>

        <View style={{flex: 1}}>
          <Card>
            <Card.Title
              title={notify.date}
              subtitle={notify.title}
              titleStyle={{fontSize: 18, alignSelf: 'center'}}
              subtitleStyle={{fontSize: 16, alignSelf: 'center'}}
              left={props => (
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={30}
                  onPress={() =>
                    homeDetails.Notifications.length && getPreviousNotify()
                  }
                />
              )}
              right={props => (
                <Ionicons
                  style={{paddingRight: 12}}
                  name="arrow-forward-circle-outline"
                  size={30}
                  onPress={() =>
                    homeDetails.Notifications.length && getNextNotify()
                  }
                />
              )}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
