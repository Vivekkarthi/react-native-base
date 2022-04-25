import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {useSelector} from 'react-redux';
import {Card, Title, Paragraph} from 'react-native-paper';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS} from '../constants';

const NotificationsScreen = ({navigation, route}) => {
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

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 10}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />
        <Ionicons
          name="ios-notifications-outline"
          size={23}
          color={'#002060'}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: '#002060',
            }}>
            Notifications
          </Text>
        </Ionicons>
        <View style={{flex: 1, paddingTop: 10}}>
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
};

export default NotificationsScreen;
