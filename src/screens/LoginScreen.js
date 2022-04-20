import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {useDispatch} from 'react-redux';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {loginSchema} from '../utils/ValidateSchema';

import auth from '@react-native-firebase/auth';
import {firebaseAuthErrors} from '../utils/Handlers';
import {findLastIndex, isEmpty} from 'lodash';
import {
  memberLogin,
  rememberMe,
  saveMemberDetails,
} from '../redux/actions/AuthState';
import {Loader} from '../components/Loader';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, SIZES} from '../constants';

const LoginScreen = ({navigation}) => {
  const {rememberLogin} = useSelector(state => state.AuthState);

  const [inputUser, setInputUser] = useState({Email: '', Password: ''});
  const [isSelected, setSelection] = useState(false);
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(true);

  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      Email: '',
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
    try {
      setLoginError(null);
      setLoader(true);
      const formData = {
        Email: user.Email,
        Password: user.Password,
      };
      setInputUser(() => formData);
      memberLogin(user, navigation)
        .then(async resp => {
          console.log('0000000000000000', resp);
          dispatch(rememberMe(user, isSelected));
          dispatch(saveMemberDetails(resp));
          // await auth()
          //   .signInWithEmailAndPassword(user.Email, user.Password)
          //   .then(authResponse => {
          //     if (authResponse.user) {
          //       authResponse.user
          //         .getIdToken()
          //         .then(token => {
          //           console.log('Token: ', token);
          //           dispatch(rememberMe(user, isSelected));
          //           dispatch(saveMemberDetails(authResponse.user));
          //           setLoader(false);
          //           setInputUser(prevState => ({
          //             ...prevState,
          //             Email: '',
          //             Password: '',
          //           }));
          //         })
          //         .catch(error => {
          //           setLoader(false);
          //           console.log('CatchedTokenError', error);
          //         });
          //     }
          //   })
          //   //we need to catch the whole sign up process if it fails too.
          //   .catch(error => {
          //     const response = firebaseAuthErrors(error);
          //     setLoader(false);
          //     setLoginError(response);
          //     console.log('CatchedTokenError2', response);
          //   });
        })
        .catch(error => {
          console.log('eeeeeeeeeeeeeee', error);
          setLoader(false);
          setLoginError(error.message);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const getRememberData = useCallback(async () => {
    if (rememberLogin) {
      await AsyncStorage.getItem('rememberMe').then(value => {
        const rememberData = JSON.parse(value);
        setValue('Email', rememberData.Email);
        setValue('Password', rememberData.Password);

        setInputUser(prevState => ({
          ...prevState,
          Email: rememberData.Email,
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
    <ScrollView contentContainerStyle={[styles.container]}>
      {loader ? <Loader /> : null}
      <Image
        source={require('../../assets/images/icon.png')}
        style={styles.logo}
      />

      <View
        style={{
          backgroundColor: COLORS.lightGray,
          width: '100%',
          borderTopStartRadius: SIZES.radius * 2,
          borderTopEndRadius: SIZES.radius * 2,
          padding: SIZES.base * 2,
        }}>
        <Text style={styles.text}>Login</Text>
        <FormProvider {...methods}>
          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Login ID
            </Text>
            <FormInput
              autoFocus={true}
              iconType="mail"
              defaultValues={inputUser.Email ? inputUser.Email : ''}
              textLabel={'Email'}
              // placeHolder={'Email'}
              textName={'Email'}
              keyboardType="email-address"
              errorobj={errors}
              refs={EmailRef}
              refField={() => PasswordRef.current.focus()}
            />
          </View>

          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Password
            </Text>
            <View
              style={{
                position: 'relative',
                justifyContent: 'center',
              }}>
              <FormInput
                iconType="lock"
                defaultValues={inputUser.Password ? inputUser.Password : ''}
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
          <View style={{flexDirection: 'row'}}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={{alignSelf: 'center', borderColor: 'red'}}
            />
            <Text
              style={{
                fontSize: 12,
                opacity: 0.8,
                marginTop: 8,
                paddingRight: 20,
                textAlign: 'left',
              }}>
              Remember me ?
            </Text>
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onPress={() => {
              navigation.navigate('ResetScreen');
            }}>
            <Text
              style={{
                fontSize: 16,
                opacity: 0.8,
                textAlign: 'right',
                fontWeight: 'bold',
              }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </FormProvider>

        {!isEmpty(loginError) ? (
          <Text
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Lato-Regular',
              color: '#D83F50',
            }}>
            {loginError}
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
    </ScrollView>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: SIZES.base * 2,
    position: 'relative',
  },
  logo: {
    height: 150,
    width: 350,
    left: 10,
    resizeMode: 'cover',
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
