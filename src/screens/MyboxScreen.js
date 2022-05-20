import React, {useState, useEffect, useCallback} from 'react';
import {View, SafeAreaView, Text, FlatList} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Card, Button} from 'react-native-paper';
import RNSpeedometer from 'react-native-speedometer';
//import Tooltip from 'react-native-walkthrough-tooltip';

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
import {useIsFocused} from '@react-navigation/native';

export default function MyboxScreen({navigation, route}) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const toast = useToast();
  const [loader, setLoader] = useState(true);
  const [onTakePhoto, setOnTakePhoto] = useState({
    internal: true,
    external: true,
  });
  const {loggedMember} = useSelector(state => state.AuthState);
  const {boxDetails} = useSelector(state => state.BoxState);

  const getMyBoxData = useCallback(() => {
    setLoader(true);
    fetchBoxData(loggedMember.LoginID, loggedMember.ControllerID)
      .then(async resp => {
        setOnTakePhoto(pre => ({
          ...pre,
          internal: resp.OnDemandPhoto2 === 1 ? false : true,
          external: resp.OnDemandPhoto1 === 1 ? false : true,
        }));
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

  const captureCamera = (cameraType, type) => {
    setLoader(true);
    setOnTakePhoto(prev => ({
      ...prev,
      ...(type === 'internal'
        ? {internal: cameraType === 2 ? false : true}
        : {}),
      ...(type === 'external'
        ? {external: cameraType === 1 ? false : true}
        : {}),
    }));
    callInternalOrExternalCameraOnBox(
      loggedMember.LoginID,
      loggedMember.ControllerID,
      cameraType,
    )
      .then(async resp => {
        if (resp === 'SUCCESS-1' || resp === 'SUCCESS-2') {
          //Good
          setLoader(false);
          setOnTakePhoto(prev => ({
            ...prev,
            internal: true,
            external: true,
          }));
          navigation.navigate('Images');
        } else {
          // Not Good
          setLoader(false);
          setOnTakePhoto(prev => ({
            ...prev,
            internal: true,
            external: true,
          }));
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
        setOnTakePhoto(prev => ({
          ...prev,
          internal: true,
          external: true,
        }));
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
    if (isFocused) {
      getMyBoxData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginBottom: 15,
            }}>
            <Text style={styles.f18}> My DoorBox</Text>
          </Feather>

          <FlatList
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            data={[{ID: '1'}]}
            keyExtractor={item => `${item.ID}`}
            renderItem={() => (
              <>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    marginTop: 5,
                    marginBottom: 8,
                    backgroundColor: COLORS.primary,
                    color: COLORS.white,
                    paddingTop: 9,
                    paddingBottom: 10,
                  }}>
                  Action
                </Text>
                {/* <View
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
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          color: '#002060',
                        }}>
                        Internal Camera
                      </Text>
                      <Card.Cover
                        style={{
                          alignSelf: 'center',
                          width: '100%',
                          height: 170,
                          resizeMode: 'contain',
                        }}
                        source={
                          boxDetails.OnDemandPhoto1 != ''
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
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          color: '#002060',
                        }}>
                        External Camera
                      </Text>
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
                </View> */}

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
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          color: '#002060',
                        }}>
                        INTERNAL CAMERA
                      </Text>
                      <View style={{height: '60%'}}>
                        <Entypo
                          style={{
                            alignSelf: 'center',
                            marginTop: 10,
                          }}
                          name={'camera'}
                          color={
                            onTakePhoto.internal
                              ? COLORS.messageColor4
                              : 'green'
                          }
                          size={80}
                        />
                      </View>

                      <View style={{height: '40%'}}>
                        {
                          <Button onPress={() => captureCamera(2, 'internal')}>
                            Take a photo
                          </Button>
                        }
                      </View>
                    </Card>

                    {/* <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 150,
                      }}>
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 16,
                          color: '#002060',
                        }}>
                        EXTERNAL CAMERA
                      </Text>
                      <View style={{height: '60%'}}>
                        <Entypo
                          style={{
                            alignSelf: 'center',
                            marginTop: 10,
                          }}
                          name={'camera'}
                          color={
                            onTakePhoto.external
                              ? COLORS.messageColor4
                              : 'green'
                          }
                          size={80}
                        />
                      </View>

                      <View style={{height: '40%'}}>
                        {
                          <Button onPress={() => captureCamera(1, 'external')}>
                            Take a photo
                          </Button>
                        }
                      </View>
                    </Card> */}
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 150,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <Button>Alarm</Button>
                      </View>
                      <View style={{height: '75%'}}>
                        <Entypo
                          onPress={() =>
                            toggleAlarm(boxDetails.AlarmState === 1 ? 2 : 1)
                          }
                          style={{
                            alignSelf: 'center',
                            marginTop: -5,
                          }}
                          name={
                            boxDetails.AlarmState === 1 ? 'sound' : 'sound-mute'
                          }
                          color={
                            boxDetails.AlarmState === 1
                              ? 'green'
                              : COLORS.messageColor4
                          }
                          size={100}
                        />
                      </View>
                    </Card>
                  </View>
                </View>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    marginTop: 5,
                    marginBottom: 8,
                    backgroundColor: COLORS.gray,
                    color: COLORS.white,
                    paddingTop: 9,
                    paddingBottom: 10,
                  }}>
                  Others
                </Text>
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
                        height: 160,
                      }}>
                      <View style={{height: '25%', paddingTop: 2}}>
                        <Button>WIFI</Button>
                      </View>
                      <View style={{height: '75%', marginTop: -2}}>
                        <RNSpeedometer
                          value={boxDetails.WIFI ? boxDetails.WIFI : 0}
                          size={160}
                          wrapperStyle={{
                            alignSelf: 'center',
                          }}
                          labelNoteStyle={{display: 'none'}}
                        />
                      </View>
                    </Card>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 160,
                      }}>
                      <View style={{height: '25%'}}>
                        <Button>Battery</Button>
                      </View>
                      <View style={{height: '65%', bottom: 8}}>
                        <MaterialCommunityIcons
                          style={{
                            alignSelf: 'center',
                          }}
                          name={getBatteryType(
                            boxDetails.Battery
                              ? Math.round(boxDetails.Battery / 10) * 10
                              : 0,
                          )}
                          color={getBatteryTypeColor(
                            boxDetails.Battery
                              ? Math.round(boxDetails.Battery / 10) * 10
                              : 0,
                          )}
                          size={100}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          justifyContent: 'center',
                          bottom: 17,
                          fontSize: 24,
                          fontWeight: 'bold',
                        }}>
                        {boxDetails.Battery ? boxDetails.Battery : 0}
                      </Text>
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
                        height: 160,
                      }}>
                      <View style={{height: '25%', paddingTop: 2}}>
                        <Button>Temperature</Button>
                      </View>
                      <View style={{height: '75%', marginTop: -2}}>
                        <RNSpeedometer
                          value={boxDetails.TEMPER ? boxDetails.TEMPER : 0}
                          size={160}
                          wrapperStyle={{
                            alignSelf: 'center',
                          }}
                          labelNoteStyle={{display: 'none'}}
                        />
                      </View>
                    </Card>
                  </View>
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    marginTop: 5,
                    marginBottom: 8,
                    backgroundColor: COLORS.gray,
                    color: COLORS.white,
                    paddingTop: 9,
                    paddingBottom: 10,
                  }}>
                  Controller password
                </Text>
                {/* <Tooltip
                  isVisible={this.state.toolTipVisible}
                  content={<Text>Check this out!</Text>}
                  placement="top"
                  onClose={() =>
                    this.setState({toolTipVisible: false})
                  }></Tooltip> */}
              </>
            )}
          />
        </View>
      </SafeAreaView>
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
  );
}
