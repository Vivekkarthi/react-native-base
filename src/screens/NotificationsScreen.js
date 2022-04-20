import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import {useSelector, useDispatch} from 'react-redux';
import {fetchHomeData} from '../redux/actions/HomeState';
import {Card, Title, Paragraph} from 'react-native-paper';

const NotificationsScreen = ({navigation, route}) => {
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

    console.log('initial: ' + idx);

    if (idx === 0) {
      var idx = arr - 1;
    } else {
      var idx = idx - 1;
    }

    console.log('updated: ' + idx);

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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Notifications Screen</Text>
          <Text>{route.params?.title}</Text>
        </View>

        <View style={{flex: 1}}>
          <Card style={{paddingRight: 14}}>
            <Card.Title
              title={notify.date}
              message={notify.subtitle}
              header={notify.title}
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
            <Text>Hardware message:</Text>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
