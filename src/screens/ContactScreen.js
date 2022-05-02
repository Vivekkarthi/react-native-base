import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, Text} from 'react-native';
import {Button} from 'react-native-paper';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {Card, Avatar} from 'react-native-paper';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {Loader} from '../components/Loader';
import {fetchHomeData, saveMemberHomeDetails} from '../redux/actions/HomeState';

const ContactScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const {loggedMember} = useSelector(state => state.AuthState);
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
    [dispatch],
  );
  const getNextNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).add(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).add(1, 'days'));
  };

  const getPreviousNotify = () => {
    setNotifyDate(moment(new Date(notifyDate)).subtract(1, 'days'));
    getHomeData(moment(new Date(notifyDate)).subtract(1, 'days'));
  };

  //   const onRefresh = useCallback(async () => {
  //     setRefreshing(true);
  //     getHomeData(new Date());
  //     setRefreshing(false);
  //   }, [getHomeData]);

  useEffect(() => {
    getHomeData(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: COLORS.background, padding: 8}}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
        <Ionicons
          name="ios-people-outline"
          size={23}
          color={COLORS.primary}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Regular',
              color: COLORS.primary,
            }}>
            {' '}
            Contact Us
          </Text>
        </Ionicons>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            style={{margin: 5}}
            mode="contained"
            onPress={() => navigation.goBack()}>
            Go Back
          </Button>
          <Button
            style={{margin: 5}}
            mode="contained"
            onPress={() => navigation.navigate('ContactDetails')}>
            Add
          </Button>
        </View>
        <Card style={{marginBottom: 5}}>
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
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
};

export default ContactScreen;
