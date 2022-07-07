import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  RefreshControl,
  Keyboard,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {Card, Button} from 'react-native-paper';
import RNSpeedometer from 'react-native-speedometer';
import {yupResolver} from '@hookform/resolvers/yup';

import {COLORS, SIZES} from '../constants';
import AppStatusBar from '../components/AppStatusBar';
import Feather from 'react-native-vector-icons/Feather';

import {Loader} from '../components/Loader';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {getBatteryType, getBatteryTypeColor} from '../utils/Handlers';
import {getTemperatureType, getTemperatureTypeColor} from '../utils/Handlers';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  callAlarmOnOffBox,
  callInternalOrExternalCameraOnBox,
  callPIRSensor,
  fetchBoxData,
  saveMyBoxDetails,
  updateControllerPassword,
} from '../redux/actions/BoxState';
import Toast from 'react-native-simple-toast';
import styles from '../styles/AppStyles';
import {useForm, FormProvider} from 'react-hook-form';
import {controllerPasswordSchema} from '../utils/ValidateSchema';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {isEmpty} from 'lodash';

export default function MyboxScreen({navigation, route}) {
  const dispatch = useDispatch();

  const [loader, setLoader] = useState(false);
  const [onTakePhoto, setOnTakePhoto] = useState({
    internal: true,
    external: true,
  });
  const {loggedMember} = useSelector(state => state.AuthState);
  const {boxDetails} = useSelector(state => state.BoxState);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [passcode, setPasscode] = useState(boxDetails.PassCodeX);
  const PasswordRef = useRef(null);

  const methods = useForm({
    criteriaMode: 'all',
    defaultValues: {
      Password: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(controllerPasswordSchema),
  });

  const {
    handleSubmit,
    setValue,
    formState: {errors},
  } = methods;

  const getMyBoxData = useCallback(() => {
    setLoader(true);
    fetchBoxData(
      loggedMember.LoginID,
      loggedMember.ControllerID,
      loggedMember.V3Version,
    )
      .then(async resp => {
        setOnTakePhoto(pre => ({
          ...pre,
          internal: resp.OnDemandPhoto2 === 1 ? false : true,
          external: resp.OnDemandPhoto1 === 1 ? false : true,
        }));
        if (resp.SyncDateTime) {
          //Good
          setValue('Password', resp.PassCodeX);
          setPasscode(resp.PassCodeX);
          dispatch(saveMyBoxDetails(resp));
          setLoader(false);
        } else {
          // Not Good
          setLoader(false);

          Toast.showWithGravity(resp, Toast.LONG, Toast.BOTTOM);
        }
      })
      .catch(error => {
        setLoader(false);
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      });
  }, [
    dispatch,
    loggedMember.ControllerID,
    loggedMember.LoginID,
    loggedMember.V3Version,
    setValue,
  ]);

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
          Toast.showWithGravity(resp, Toast.LONG, Toast.BOTTOM);
        }
      })
      .catch(error => {
        setLoader(false);
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      });
  };

  const togglePIR = sensor => {
    setLoader(true);
    callPIRSensor(loggedMember.LoginID, loggedMember.ControllerID, sensor)
      .then(async resp => {
        if (resp === 'Success') {
          //Good
          boxDetails['PIRSensor'] = sensor;
          dispatch(saveMyBoxDetails(boxDetails));
          setLoader(false);
        } else {
          // Not Good
          setLoader(false);
          Toast.showWithGravity(resp, Toast.LONG, Toast.BOTTOM);
        }
      })
      .catch(error => {
        setLoader(false);
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
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
          Toast.showWithGravity(resp, Toast.LONG, Toast.BOTTOM);
        }
      })
      .catch(error => {
        setLoader(false);
        setOnTakePhoto(prev => ({
          ...prev,
          internal: true,
          external: true,
        }));
        Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
      });
  };

  const onResetSubmit = async user => {
    Keyboard.dismiss();
    PasswordRef.current.blur();
    setLoader(true);
    const formData = {
      Password: user.Password,
    };

    setPasscode(user.Password);
    updateControllerPassword(user, loggedMember.ControllerID)
      .then(async resp => {
        if (resp === 'Success') {
          //Good
          setLoader(false);
          setPasswordError('Controller password has been updated');
        } else {
          // Not Good
          setLoader(false);
          setPasswordError('Controller password updation failed');
        }
      })
      .catch(error => {
        setLoader(false);
        setPasswordError(error.message);
      });
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    getMyBoxData();
    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputTextChange = newText => {
    setPasscode(newText);
  };

  useEffect(() => {
    getMyBoxData();
  }, [boxDetails.PassCodeX, getMyBoxData]);

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
            refreshControl={
              <RefreshControl
                colors={[COLORS.secondary, COLORS.white]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
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
                      onPress={() => captureCamera(2, 'internal')}
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 150,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <Button>
                          On Demand:{' '}
                          {boxDetails.OnDemandPhoto1 === 1 ? 'ON' : 'OFF'}
                        </Button>
                      </View>

                      <View style={{height: '60%'}}>
                        <MaterialCommunityIcons
                          style={{
                            alignSelf: 'center',
                          }}
                          name={
                            boxDetails.OnDemandPhoto1 === 1
                              ? 'camera'
                              : 'camera-off'
                          }
                          color={
                            //onTakePhoto.internal
                            boxDetails.OnDemandPhoto1 === 1
                              ? 'green'
                              : COLORS.messageColor4
                          }
                          size={100}
                        />
                      </View>
                    </Card>

                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '48%',
                        height: 150,
                      }}>
                      <View style={{marginBottom: 10}}>
                        <Button>
                          Alarm: {boxDetails.AlarmState === 1 ? 'On' : 'Off'}
                        </Button>
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
                <Card
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    display: loggedMember.V3Version === 1 ? 'none' : 'flex',
                    width: '48%',
                    height: 150,
                  }}>
                  <View style={{marginBottom: 10}}>
                    <Button>
                      PIR Sensor: {boxDetails.PIRSensor === 1 ? 'On' : 'Off'}
                    </Button>
                  </View>
                  <View style={{height: '75%'}}>
                    <MaterialCommunityIcons
                      onPress={() =>
                        togglePIR(boxDetails.PIRSensor === 1 ? 0 : 1)
                      }
                      style={{
                        alignSelf: 'center',
                        marginTop: -5,
                      }}
                      name={
                        boxDetails.PIRSensor === 1
                          ? 'motion-sensor'
                          : 'motion-sensor-off'
                      }
                      color={
                        boxDetails.PIRSensor === 1
                          ? 'green'
                          : COLORS.messageColor4
                      }
                      size={100}
                    />
                  </View>
                </Card>

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
                      }}
                      onPress={() =>
                        Toast.showWithGravity(
                          `The current Doorbox WIFI is ${boxDetails.WIFI} `,
                          Toast.LONG,
                          Toast.BOTTOM,
                        )
                      }>
                      <View style={{height: '25%', paddingTop: 2}}>
                        <Button>WIFI</Button>
                      </View>
                      <View style={{height: '75%', marginTop: -2}}>
                        <RNSpeedometer
                          value={boxDetails.WIFI ? Number(boxDetails.WIFI) : 0}
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
                      }}
                      onPress={() =>
                        Toast.showWithGravity(
                          `The current Doorbox Battery is ${boxDetails.Battery} `,
                          Toast.LONG,
                          Toast.BOTTOM,
                        )
                      }>
                      <View style={{height: '25%'}}>
                        <Button>Battery</Button>
                        {/* <Tooltip label="Hey, I'm here!" openDelay={500}>
                        </Tooltip>; */}
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
                <Card
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '48%',
                    height: 160,
                  }}
                  onPress={() =>
                    Toast.showWithGravity(
                      `The current Doorbox Temperature is ${boxDetails.TEMPER} `,
                      Toast.LONG,
                      Toast.BOTTOM,
                    )
                  }>
                  <View style={{height: '25%'}}>
                    <Button>Temperature</Button>
                    {/* <Tooltip label="Hey, I'm here!" openDelay={500}>
                        </Tooltip>; */}
                  </View>
                  <View style={{height: '65%', bottom: 8}}>
                    <FontAwesome
                      style={{
                        alignSelf: 'center',
                      }}
                      name={getTemperatureType(
                        boxDetails.TEMPER
                          ? Math.round(boxDetails.TEMPER / 10) * 10
                          : 0,
                      )}
                      color={getTemperatureTypeColor(
                        boxDetails.TEMPER
                          ? Math.round(boxDetails.TEMPER / 10) * 10
                          : 0,
                      )}
                      size={92}
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
                    {boxDetails.TEMPER ? boxDetails.TEMPER : 0}
                  </Text>
                </Card>

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
                  Reset Controller Password
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
                    }}>
                    <Card
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                        // height: 160,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          padding: SIZES.base * 2,
                        }}>
                        <FormProvider {...methods}>
                          <View style={{marginBottom: SIZES.base}}>
                            <Text
                              style={{
                                fontSize: 16,
                                opacity: 0.5,
                                marginBottom: SIZES.base,
                                fontWeight: 'bold',
                                color: '#0d8e8a',
                              }}>
                              Password
                            </Text>
                            <FormInput
                              iconType="lock"
                              defaultValues={passcode}
                              textLabel={'Password'}
                              textName={'Password'}
                              keyboardType="numeric"
                              errorobj={errors}
                              showHidePassword={() => {
                                setPwdVisible(!pwdVisible);
                                setShowPassword(!showPassword);
                              }}
                              showPassword={showPassword}
                              pwdVisible={pwdVisible}
                              // value={passcode}
                              onChangeText={() => {
                                handleInputTextChange();
                                setPasswordError(null);
                              }}
                              refs={PasswordRef}
                              maxLength={5}
                            />
                          </View>
                        </FormProvider>

                        {passwordError !== '' ? (
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Lato-Regular',
                              textAlign: 'center',
                              color:
                                passwordError === 'Success'
                                  ? '#D83F50'
                                  : '#0DA728',
                            }}>
                            {passwordError}
                          </Text>
                        ) : null}

                        <FormButton
                          buttonTitle="Reset"
                          isPrimary={true}
                          style={{
                            marginVertical: SIZES.base * 2,
                          }}
                          onPress={handleSubmit(onResetSubmit)}
                        />
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
