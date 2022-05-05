import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Card, Button} from 'react-native-paper';
import RNSpeedometer from 'react-native-speedometer';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';
import Feather from 'react-native-vector-icons/Feather';

import {Loader} from '../components/Loader';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {getBatteryType, getBatteryTypeColor} from '../utils/Handlers';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  callAlarmOnOffBox,
  callInternalOrExternalCameraOnBox,
  fetchBoxData,
  saveMyBoxDetails,
} from '../redux/actions/BoxState';
import {useToast} from 'react-native-toast-notifications';
import styles from '../styles/AppStyles';
import {CONFIG} from '../utils/Config';

export default function MyboxScreen({navigation, route}) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loader, setLoader] = useState(true);
  // const [batteryPercentage, setBatteryPercentage] = useState(80);
  const {loggedMember} = useSelector(state => state.AuthState);
  // const {homeDetails} = useSelector(state => state.HomeState);
  const {boxDetails} = useSelector(state => state.BoxState);

  const getMyBoxData = useCallback(() => {
    setLoader(true);
    fetchBoxData(loggedMember.LoginID, loggedMember.ControllerID)
      .then(async resp => {
        if (resp.SyncDateTime) {
          //Good
          dispatch(saveMyBoxDetails(resp));
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
  }, [dispatch, loggedMember.ControllerID, loggedMember.LoginID, toast]);

  const toggleAlarm = alarmState => {
    setLoader(true);
    callAlarmOnOffBox(
      loggedMember.LoginID,
      loggedMember.ControllerID,
      alarmState,
    )
      .then(async resp => {
        if (resp === 'SUCCESS-1' || resp === 'SUCCESS-2') {
          //Good
          boxDetails['AlarmState'] = alarmState;
          dispatch(saveMyBoxDetails(boxDetails));
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

  const captureCamera = cameraType => {
    setLoader(true);
    callInternalOrExternalCameraOnBox(
      loggedMember.LoginID,
      loggedMember.ControllerID,
      cameraType,
    )
      .then(async resp => {
        if (resp === 'SUCCESS-1' || resp === 'SUCCESS-2') {
          //Good
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

  useEffect(() => {
    getMyBoxData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Feather
            name="box"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}> Mybox</Text>
          </Feather>
          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <>
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
                      }}><Text style={{alignSelf: 'center',fontSize:16, color:'#002060'}}>External Camera</Text>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                            width: '100%',
                            height: 170,
                            resizeMode: 'contain',
                        }}
                        source={
                          boxDetails.OnDemandPhoto1 != ""
                            ? {
                                uri: `${CONFIG.IMAGE_URL}/${boxDetails.OnDemandPhoto1}`,
                              }
                            : require('../../assets/images/no-image.jpg')
                        }
                      />
                      <Card.Actions
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Button onPress={() => captureCamera(1)}>
                          Take a photo
                        </Button>
                      </Card.Actions>
                    </Card>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                      }}><Text style={{alignSelf: 'center',fontSize:16, color:'#002060'}}>Internal Camera</Text>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: '100%',
                          height: 170,
                          resizeMode: 'contain',
                        }}
                        source={
                          boxDetails.OnDemandPhoto2
                            ? {
                                uri: `${CONFIG.IMAGE_URL}/${boxDetails.OnDemandPhoto2}`,
                              }
                            : require('../../assets/images/no-image.jpg')
                        }
                      />
                      <Card.Actions
                        style={{
                          justifyContent: 'center',
                        }}>
                        <Button onPress={() => captureCamera(2)}>
                          Take a photo
                        </Button>
                      </Card.Actions>
                    </Card>
                  </View>
                </View>
                <View
                  style={{
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
                        height: 150,
                      }}>
                      <View style={{height: '75%'}}>
                        <RNSpeedometer
                          value={boxDetails.Battery ? boxDetails.Battery : 0}
                          size={140}
                          wrapperStyle={{
                            alignSelf: 'center',
                          }}
                          labelNoteStyle={{display: 'none'}}
                        />
                      </View>

                      <View style={{height: '25%'}}>
                        <Button>Battery</Button>
                      </View>
                    </Card>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 150,
                      }}>
                      <View style={{height: '75%'}}>
                        <MaterialCommunityIcons
                          style={{
                            alignSelf: 'center',
                          }}
                          name={getBatteryType(
                            boxDetails.WIFI ? boxDetails.WIFI : 0,
                          )}
                          color={getBatteryTypeColor(
                            boxDetails.WIFI ? boxDetails.WIFI : 0,
                          )}
                          size={120}
                        />
                      </View>

                      <View style={{height: '25%'}}>
                        <Button>Wifi</Button>
                      </View>
                    </Card>
                  </View>
                </View>

                <View
                  style={{
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
                        height: 150,
                      }}>
                      <View style={{height: '75%'}}>
                        <Entypo
                          onPress={() =>
                            toggleAlarm(boxDetails.AlarmState === 1 ? 2 : 1)
                          }
                          style={{
                            alignSelf: 'center',
                            marginTop: 10,
                          }}
                          name={
                            boxDetails.AlarmState === 1 ? 'sound' : 'sound-mute'
                          }
                          color={
                            boxDetails.AlarmState === 1
                              ? COLORS.messageColor1
                              : COLORS.messageColor4
                          }
                          size={100}
                        />
                      </View>

                      <View style={{height: '25%'}}>
                        <Button>Alarm</Button>
                      </View>
                    </Card>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 150,
                      }}>
                      <View style={{height: '75%'}}>
                        <RNSpeedometer
                          value={boxDetails.TEMPER ? boxDetails.TEMPER : 0}
                          size={140}
                          wrapperStyle={{
                            alignSelf: 'center',
                          }}
                          labelNoteStyle={{display: 'none'}}
                        />
                      </View>
                      <View style={{height: '25%'}}>
                        <Button>Temperature</Button>
                      </View>
                    </Card>
                  </View>
                </View>
              </>
            )}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
}
