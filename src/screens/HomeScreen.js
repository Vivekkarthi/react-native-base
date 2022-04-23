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
      <ScrollView style={{padding: 20}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        {loader ? <Loader /> : null}
        <Ionicons name="home" size={23}>
          <Text>Home</Text>
        </Ionicons>
        <View
          style={{
            marginVertical: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Card>
            <Card.Cover
              style={{width: 200, height: 180}}
              source={
                homeDetails.PackageState === 1
                  ? require('../../assets/images/new_lock.png')
                  : require('../../assets/images/unlock.jpg')
              }
            />
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              Date: {homeDetails.LastSyncDate}
            </Text>
            <Text style={{textAlign: 'center'}}>
              {homeDetails.PackageState === 1 ? 'Locked' : 'UnLocked'}
            </Text>
          </Card>
          <Card style={{width: 150, height: 220}}>
            <Image
              style={{width: 150, height: 120, top: 30}}
              source={{
                uri: `${CONFIG.IMAGE_URL}/${homeDetails.photo1}`,
              }}
            />
            {/* <Title>Status</Title>
              <Paragraph>{homeDetails.packageMessage}</Paragraph> */}
            <Text style={{textAlign: 'center', top: 60}}>Last updated</Text>
          </Card>
        </View>

        <View style={{flex: 1}}>
          <Card style={{paddingRight: 14}}>
            <Card.Title
              title={notify.date}
              subtitle={notify.title}
              titleStyle={{fontSize: 18}}
              subtitleStyle={{fontSize: 16}}
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
