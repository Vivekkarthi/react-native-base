import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, Text, Image, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';
import {fetchHomeData} from '../redux/actions/HomeState';
import {Card, Title, Paragraph} from 'react-native-paper';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';
import {memberhome} from '../redux/actions/AuthState';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const {homeDetails} = useSelector(state => state.HomeState);
  const [notify, setNotify] = useState({
    notifications: homeDetails.notifications,
    activeNotification: '',
    date: moment(new Date()).format('MMMM DD, YYYY'),
    title: 'Notifications',
    subtitle: 'Notification title',
    description: 'Notification not found',
  });

  const getNextNotify = () => {
    var arr = homeDetails.notifications.length;
    var idx = notify.activeNotification + 1;
    var idx = idx % arr;

    setNotify({
      activeNotification: idx,
      date: homeDetails.notifications[idx].date,
      title: homeDetails.notifications[idx].title,
      description: homeDetails.notifications[idx].description,
      subtitle: homeDetails.notifications[idx].subtitle,
    });
  };

  const getPreviousNotify = () => {
    var arr = homeDetails.notifications.length;
    var idx = notify.activeNotification;

    if (idx === 0) {
      var idx = arr - 1;
    } else {
      var idx = idx - 1;
    }

    setNotify({
      activeNotification: idx,
      date: homeDetails.notifications[idx].date,
      title: homeDetails.notifications[idx].title,
      description: homeDetails.notifications[idx].description,
      subtitle: homeDetails.notifications[idx].subtitle,
    });
  };

  useEffect(() => {
    dispatch(fetchHomeData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
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
              style={{width: 178, height: 180}}
              source={
                homeDetails.isLock
                  ? require('../../assets/images/new_lock.png')
                  : require('../../assets/images/unlock.jpg')
              }
            />
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              Date: {notify.date}
            </Text>
            <Text style={{textAlign: 'center'}}>
              State:{homeDetails.packageMessage}
            </Text>
          </Card>
          <Card style={{width: 190, height: 220}}>
            <Image
              style={{width: 180, height: 120, top: 30}}
              source={{
                uri: 'https://controller5.s3.us-west-1.amazonaws.com/images/env1.jpg',
              }}
            />
            {/* <Title>Status</Title>
              <Paragraph>{homeDetails.packageMessage}</Paragraph> */}
            <Text style={{textAlign: 'center', top: 60}}>last updated</Text>
          </Card>
        </View>

        <View style={{flex: 1}}>
          <Card style={{paddingRight: 14}}>
            <Card.Title
              title={notify.date}
              message={notify.subtitle}
              subtitle={notify.description}
              titleStyle={{fontSize: 18}}
              subtitleStyle={{fontSize: 16}}
              left={props => (
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={30}
                  onPress={() => getPreviousNotify()}
                />
              )}
              right={props => (
                <Ionicons
                  name="arrow-forward-circle-outline"
                  size={30}
                  onPress={() => getNextNotify()}
                />
              )}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
