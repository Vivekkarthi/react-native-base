import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {useToast} from 'react-native-toast-notifications';
import PackagesScreen from '../screens/PackagesScreen';

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

  const [notifyDate, setNotifyDate] = useState(new Date());

  const getHomeData = currentDate => {
    setLoader(true);
    const convertDate = moment(currentDate).format('YYYY-MM-DD');
    fetchHomeData(loggedMember.LoginID, loggedMember.ControllerID, convertDate)
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
  };

  const getNextNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).add(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).add(1, 'days'));
  };

  const getPreviousNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).subtract(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).subtract(1, 'days'));
  };

  useEffect(() => {
    getHomeData(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#dfe1eb'}}>
      <ScrollView style={{padding: 10, marginTop: -15}}>
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
                width: '48%',
              }}>
              <Card.Cover
                style={{alignSelf: 'center', width: 100, height: 100}}
                source={
                  homeDetails.PackageState === 1
                    ? require('../../assets/images/new_lock.png')
                    : require('../../assets/images/new_unlock.jpg')
                }
              />
              <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                {moment(homeDetails.LastSyncDate).format('YYYY-MM-DD hh:mm:ss')}
              </Text>
              <Text style={{textAlign: 'center'}}>
                {homeDetails.PackageState === 1 ? 'Locked' : 'UnLocked'}
              </Text>
            </Card>
            <Card
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '48%',
              }}>
              {homeDetails.Photos && (
                <Card.Cover
                  style={{
                    alignSelf: 'center',
                    width: '100%',
                    height: 150,
                  }}
                  onPress={() => navigation.navigate('PackagesScreen')}
                  source={{
                    uri: `${CONFIG.IMAGE_URL}/${homeDetails.Photos[0].Filename}`,
                  }}
                />
              )}
            </Card>
          </View>
        </View>

        <View style={{flex: 1, paddingBottom: 5}}>
          <Card>
            <Card.Title
              title={moment(new Date(notifyDate)).format('MMMM DD, YYYY')}
              // subtitle={'subtitle'}
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
        </View>
        <View>
          {homeDetails.Notifications && homeDetails.Notifications.length ? (
            homeDetails.Notifications.map((notification, index) => (
              <View style={{flex: 1, paddingBottom: 5}} key={index}>
                <Card style={{backgroundColor: '#fab9b9'}}>
                  <Card.Title
                    title={notification.Messagex}
                    titleStyle={{fontSize: 18, alignSelf: 'center'}}
                  />
                </Card>
              </View>
            ))
          ) : (
            <Card style={{backgroundColor: '#fab9b9'}}>
              <Card.Title
                title={'No notification message.'}
                titleStyle={{fontSize: 14, alignSelf: 'center'}}
              />
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
