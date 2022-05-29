import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {loginSchema} from '../utils/ValidateSchema';
// import Toast from 'react-native-simple-toast';

import {
  memberLogin,
  rememberMe,
  saveMemberDetails,
} from '../redux/actions/AuthState';
import {Loader} from '../components/Loader';
import {COLORS, SIZES} from '../constants';
import AppStatusBar from '../components/AppStatusBar';
import {isEmpty, isUndefined} from 'lodash';

const LoginScreen = ({navigation, route}) => {
  const content = route.params && route.params.content;
  const {rememberLogin} = useSelector(state => state.AuthState);
  const [inputUser, setInputUser] = useState({PhoneNumber: '', Password: ''});
  const [loginError, setLoginError] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(true);
  //
  const PasswordRef = useRef(null);
  const PhoneNumberRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      PhoneNumber: '',
      Password: '',
    },
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    setValue,
    formState: {errors},
  } = methods;

  const dispatch = useDispatch();

  const onLoginSubmit = async user => {
    setLoader(true);
    const formData = {
      PhoneNumber: user.PhoneNumber,
      Password: user.Password,
    };
    setInputUser(() => formData);
    memberLogin(user, navigation)
      .then(async resp => {
        if (resp.USERRECORDID !== 0 && resp.AddlField1 === '') {
          //Good
          setLoader(false);
          AsyncStorage.setItem('loggedUser', JSON.stringify(resp));
          dispatch(rememberMe(user, isSelected));
          dispatch(saveMemberDetails(resp));
        } else {
          // Not Good
          setLoader(false);
          setLoginError(resp.AddlField1);
        }
      })
      .catch(error => {
        setLoader(false);
        setLoginError(error);
      });
  };

  const getRememberData = useCallback(async () => {
    if (rememberLogin) {
      await AsyncStorage.getItem('rememberMe').then(value => {
        const rememberData = JSON.parse(value);
        setValue('PhoneNumber', rememberData.PhoneNumber);
        setValue('Password', rememberData.Password);

        setInputUser(prevState => ({
          ...prevState,
          PhoneNumber: rememberData.PhoneNumber,
          Password: rememberData.Password,
        }));

        setSelection(true);
      });
    }
  }, [rememberLogin, setValue]);

  useEffect(() => {
    getRememberData();
  }, [getRememberData]);

  return (
    <FlatList
      style={[{flex: 1}, styles.container]}
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      data={[{ID: '1'}]}
      keyExtractor={item => `${item.ID}`}
      renderItem={() => (
        <View>
          <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
          {loader ? <Loader /> : null}
          <Image
            source={require('../../assets/images/icon.png')}
            style={{
              alignSelf: 'center',
              height: 150,
              width: 280,
            }}
            resizeMode="stretch"
          />

          <View
            style={{
              backgroundColor: COLORS.lightGray,
              width: '100%',
              borderTopStartRadius: SIZES.radius * 2,
              borderTopEndRadius: SIZES.radius * 2,
              padding: SIZES.base * 2,
            }}>
            <Text style={styles.text}>Enter your credentials</Text>

            <KeyboardAvoidingView
              style={{flex: 1}}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
              <FlatList
                style={{width: '100%'}}
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                data={[{ID: '1'}]}
                keyExtractor={item => `${item.ID}`}
                renderItem={() => (
                  <>
                    <FormProvider {...methods}>
                      <View style={{marginBottom: SIZES.base}}>
                        <Text
                          style={{
                            fontSize: 16,
                            opacity: 0.5,
                            marginBottom: SIZES.base,
                            color: '#0d8e8a',
                            fontWeight: 'bold',
                          }}>
                          Login ID
                        </Text>
                        <FormInput
                          autoFocus={true}
                          iconType="phone"
                          defaultValues={
                            inputUser.PhoneNumber ? inputUser.PhoneNumber : ''
                          }
                          textLabel={'Login ID'}
                          textName={'PhoneNumber'}
                          keyboardType="default"
                          errorobj={errors}
                          refs={PhoneNumberRef}
                          refField={() => PasswordRef.current.focus()}
                        />
                      </View>

                      <View style={{marginBottom: SIZES.base}}>
                        <Text
                          style={{
                            fontSize: 16,
                            opacity: 0.5,
                            marginBottom: SIZES.base,
                            color: '#0d8e8a',
                            fontWeight: 'bold',
                          }}>
                          Password
                        </Text>
                        <View
                          style={{
                            position: 'relative',
                            justifyContent: 'center',
                          }}>
                          <FormInput
                            iconType="lock"
                            defaultValues={
                              inputUser.Password ? inputUser.Password : ''
                            }
                            textLabel={'Password'}
                            // placeHolder={'Password'}
                            textName={'Password'}
                            keyboardType="default"
                            errorobj={errors}
                            showHidePassword={() => {
                              setPwdVisible(!pwdVisible);
                              setShowPassword(!showPassword);
                            }}
                            showPassword={showPassword}
                            pwdVisible={pwdVisible}
                            refs={PasswordRef}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <CheckBox
                            value={isSelected}
                            onValueChange={setSelection}
                          />
                          <Text
                            style={{
                              fontSize: 12,
                              opacity: 0.8,
                              marginTop: 8,
                              paddingRight: 20,
                              textAlign: 'left',
                              color: '#0d8e8a',
                            }}>
                            Remember me ?
                          </Text>
                        </View>

                        {/* <TouchableOpacity
                          style={{
                            marginTop: 8,
                            paddingLeft: 20,
                            textAlign: 'right',
                          }}
                          onPress={() => {
                            navigation.navigate('ResetScreen');
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              opacity: 0.8,
                              fontWeight: 'bold',
                              color: COLORS.primary,
                              // left: 45,
                            }}>
                            Forgot Password ?
                          </Text>
                        </TouchableOpacity> */}
                      </View>
                    </FormProvider>

                    {!isEmpty(loginError) ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Lato-Regular',
                          textAlign: 'center',
                          color: '#D83F50',
                        }}>
                        {loginError}
                      </Text>
                    ) : null}

                    {!isUndefined(content) ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: 'Lato-Regular',
                          textAlign: 'center',
                          color: 'green',
                        }}>
                        {content}
                      </Text>
                    ) : null}

                    <FormButton
                      buttonTitle="Sign In"
                      isPrimary={true}
                      style={{
                        marginVertical: SIZES.base * 2,
                      }}
                      onPress={handleSubmit(onLoginSubmit)}
                    />
                  </>
                )}
              />
            </KeyboardAvoidingView>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: SIZES.base,
              }}>
              <Text
                style={{
                  fontSize: 16,
                }}>
                Don't have an account ?
              </Text>
              <TouchableOpacity
                style={{
                  padding: 10,
                }}
                onPress={() => {
                  navigation.navigate('Signup');
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginLeft: SIZES.base,
                    color: COLORS.primary,
                  }}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              <Text style={styles.color_textPrivate}>
                &#169; 2022 DOORBOX, All rights reserved.
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SIZES.base * 2,
    position: 'relative',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: SIZES.base * 2,
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
