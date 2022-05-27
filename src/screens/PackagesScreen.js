import moment from 'moment';
import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Avatar, Card, Button} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import {useToast} from 'react-native-toast-notifications';

import AppStatusBar from '../components/AppStatusBar';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {COLORS} from '../constants';
import {
  fetchPackageData,
  saveMemberPackageDetails,
} from '../redux/actions/PackageState';
import {getColorCode, getTypeOfMsg} from '../utils/Handlers';
import {Loader} from '../components/Loader';
import styles from '../styles/AppStyles';

const PackagesScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {loggedMember} = useSelector(state => state.AuthState);
  const {packageDetails} = useSelector(state => state.PackageState);
  const [loader, setLoader] = useState(true);
  const [notifyDate, setNotifyDate] = useState({
    fromDate: new Date(),
    toDate: new Date().setDate(new Date().getDate() + 7),
  });

  const getPackageData = useCallback(
    (currentDate, toDate) => {
      setLoader(true);
      const convertDate = moment(currentDate).format('YYYY-MM-DD');
      const convertToDate = moment(toDate).format('YYYY-MM-DD');
      fetchPackageData(loggedMember.ControllerID, convertDate, convertToDate)
        .then(async resp => {
          dispatch(saveMemberPackageDetails(resp));
          setLoader(false);
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
    [dispatch, loggedMember.ControllerID, toast],
  );

  const getNextNotify = () => {
    let numDays = 1;
    let now = new Date(notifyDate.toDate);
    now.setDate(now.getDate() + numDays);

    setNotifyDate(prevState => ({
      ...prevState,
      fromDate: now,
      toDate: moment(now).add(1, 'weeks'),
    }));
    getPackageData(now, moment(now).add(1, 'weeks'));
  };

  const getPreviousNotify = () => {
    let numDays = 1;
    let now = new Date(notifyDate.fromDate);
    now.setDate(now.getDate() - numDays);
    setNotifyDate(prevState => ({
      ...prevState,
      toDate: now,
      fromDate: moment(now).subtract(1, 'weeks'),
    }));
    getPackageData(moment(now).subtract(1, 'weeks'), now);
  };

  useEffect(() => {
    getPackageData(notifyDate.fromDate, notifyDate.toDate);
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
          <Feather
            name="package"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Delivery</Text>
          </Feather>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}></View>
          <View style={{flex: 1, paddingTop: 19}}>
            <Card style={{marginBottom: 5}}>
              <Card.Title
                title={`${moment(new Date(notifyDate.fromDate)).format(
                  'MMMM DD, YYYY',
                )} - ${moment(new Date(notifyDate.toDate)).format(
                  'MMMM DD, YYYY',
                )}`}
                // subtitle={moment(new Date(notifyDate.toDate)).format('MMMM DD, YYYY')}
                titleStyle={{
                  fontSize: 14,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
                // subtitleStyle={{fontSize: 12, alignSelf: 'center'}}
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
            {packageDetails.length ? (
              <FlatList
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                data={packageDetails}
                keyExtractor={(item, index) => index.toString()}
                renderItem={packageDetail => (
                  <TouchableOpacity
                    style={{
                      maxWidth: '100%',
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      backgroundColor: '#fff',
                      marginVertical: 4,
                      borderRadius: 4,
                      borderLeftColor: '#99ccff',
                      borderLeftWidth: 6,
                      justifyContent: 'center',
                      paddingLeft: 16,
                    }}
                    onPress={() => {
                      navigation.navigate('PackageDetails', {
                        deliverData: packageDetail.item,
                      });
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Avatar.Icon
                        size={42}
                        color={COLORS.white}
                        icon="notification-clear-all"
                        style={{
                          backgroundColor: '#99ccff',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'column',
                          marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#333',
                            fontWeight: 'bold',
                          }}>
                          {packageDetail.item.CustomerNamex}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            color: '#a3a3a3',
                            marginTop: 2,
                          }}>
                          {packageDetail.item.DateX}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
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

export default PackagesScreen;
