import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import CustomHeader from '../components/CustomHeader';
import {useSelector, useDispatch} from 'react-redux';
import {fetchHomeData} from '../redux/actions/HomeState';
import {Card, Title, Paragraph} from 'react-native-paper';

export default function HomeScreen({navigation}) {
  const dispatch = useDispatch();
  const {homeDetails} = useSelector(state => state.HomeState);
  const [notify, setNotify] = useState({
    notifications: homeDetails.notifications,
    activeNotification: '',
    date: moment(new Date()).format('MMMM DD, YYYY'),
    title: 'Notifications',
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
    });
  };

  useEffect(() => {
    dispatch(fetchHomeData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 20}}>
        <CustomHeader navigation={navigation} />
        <View
          style={{
            marginVertical: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Card>
            <Card.Cover
              style={{width: 100, height: 100}}
              source={
                homeDetails.isLock
                  ? require('../../assets/images/lock/Lock_Icon_256.png')
                  : require('../../assets/images/unlock/Unlock_Icon_256.png')
              }
            />
          </Card>
          <Card>
            <Card.Content>
              <Title>Status</Title>
              <Paragraph>{homeDetails.packageMessage}</Paragraph>
            </Card.Content>
          </Card>
        </View>

        <View style={{flex: 1}}>
          <Card style={{paddingRight: 14}}>
            <Card.Title
              title={notify.date}
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
