import React, {useState} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Card, Button} from 'react-native-paper';
import RNSpeedometer from 'react-native-speedometer';

import {COLORS} from '../constants';
import AppStatusBar from '../components/AppStatusBar';

import {Loader} from '../components/Loader';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {windowWidth} from '../utils/Dimentions';
import {getBatteryType, getBatteryTypeColor} from '../utils/Handlers';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  callAlarmOnOffBox,
  callInternalOrExternalCameraOnBox,
} from '../redux/actions/BoxState';
import {saveMemberHomeDetails} from '../redux/actions/HomeState';
import {useToast} from 'react-native-toast-notifications';
import styles from '../styles/AppStyles';

export default function MyboxScreen({navigation, route}) {
  const dispatch = useDispatch();
  const toast = useToast();
  const [loader, setLoader] = useState(false);
  const [batteryPercentage, setBatteryPercentage] = useState(80);
  const {loggedMember} = useSelector(state => state.AuthState);
  const {homeDetails} = useSelector(state => state.HomeState);

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
          homeDetails['AlarmState'] = alarmState;
          dispatch(saveMemberHomeDetails(homeDetails));
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

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
        <View style={styles.MainContainer}>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Ionicons
            name="ios-home-outline"
            size={23}
            color={COLORS.primary}
            style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
            <Text style={styles.f18}>Mybox</Text>
          </Ionicons>
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
                      }}>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: 100,
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/no-image.jpg')}
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
                      }}>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: 100,
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/no-image.jpg')}
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
                          value={70}
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
                          name={getBatteryType(batteryPercentage)}
                          color={getBatteryTypeColor(batteryPercentage)}
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
                        <RNSpeedometer
                          value={70}
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
                            toggleAlarm(homeDetails.AlarmState === 1 ? 2 : 1)
                          }
                          style={{
                            alignSelf: 'center',
                            marginTop: 10,
                          }}
                          name={
                            homeDetails.AlarmState === 1
                              ? 'sound'
                              : 'sound-mute'
                          }
                          color={
                            homeDetails.AlarmState === 1
                              ? COLORS.messageColor1
                              : COLORS.messageColor4
                          }
                          size={100}
                        />
                      </View>

                      <View style={{height: '25%'}}>
                        <Button>Others</Button>
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
