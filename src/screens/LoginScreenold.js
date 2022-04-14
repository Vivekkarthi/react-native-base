import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {useDispatch} from 'react-redux';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {loginSchema} from '../utils/ValidateSchema';

import auth from '@react-native-firebase/auth';
import {firebaseAuthErrors} from '../utils/Handlers';
import {isEmpty} from 'lodash';
import {rememberMe, saveMemberDetails} from '../redux/actions/AuthState';
import {Loader} from '../components/Loader';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SVGComponent from '../components/svg';

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
    criteriaMode: 'all',
    defaultValues: {
      Email: '',
      Password: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
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
      await auth()
        .signInWithEmailAndPassword(user.Email, user.Password)
        .then(authResponse => {
          if (authResponse.user) {
            authResponse.user
              .getIdToken()
              .then(token => {
                console.log('Token: ', token);
                dispatch(rememberMe(user, isSelected));
                dispatch(saveMemberDetails(authResponse.user));
                setLoader(false);
                setInputUser(prevState => ({
                  ...prevState,
                  Email: '',
                  Password: '',
                }));
              })
              .catch(error => {
                setLoader(false);
                console.log('CatchedTokenError', error);
              });
          }
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          const response = firebaseAuthErrors(error);
          setLoader(false);
          setLoginError(response);
          console.log('CatchedTokenError2', response);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const googleLogin = async () => {
    try {
      setLoader(true);
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .then(authResponse => {
          if (authResponse.user) {
            authResponse.user
              .getIdToken()
              .then(token => {
                console.log('Token: ', token);
                dispatch(saveMemberDetails(authResponse.user));
                setLoader(false);
              })
              .catch(error => {
                console.log('CatchedTokenError', error);
                setLoader(false);
              });
          }
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          const response = firebaseAuthErrors(error);
          setLoginError(response);
          setLoader(false);
          console.log('Google Error', response);
        });
    } catch (error) {
      console.log({error});
      setLoader(false);
    }
  };

  const fbLogin = async () => {
    try {
      setLoader(true);
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(facebookCredential)
        .then(authResponse => {
          if (authResponse.user) {
            authResponse.user
              .getIdToken()
              .then(token => {
                console.log('Token: ', token);
                dispatch(saveMemberDetails(authResponse.user));
                setLoader(false);
              })
              .catch(error => {
                console.log('CatchedTokenError', error);
                setLoader(false);
              });
          }
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          const response = firebaseAuthErrors(error);
          setLoginError(response);
          setLoader(false);
          console.log('Facebook Error', response);
        });
    } catch (error) {
      console.log({error});
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
      });
    }
  }, [rememberLogin, setValue]);

  useEffect(() => {
    getRememberData();
  }, [getRememberData]);

  return (
    <>
      <View
        style={{
          position: 'relative',
          paddingBottom: 10,
          height: 0,
          zIndex: -100,
          top: 0,
        }}>
        <SVGComponent />
      </View>
      <ScrollView
        contentContainerStyle={[
          // {position: 'absolute', zIndex: 1000},
          styles.container,
        ]}>
        {loader ? <Loader /> : null}
        {/* <View style={{position: 'relative', top: 0}}> */}
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Login</Text>
        <FormProvider {...methods}>
          <View style={[styles.spiltbigbar]} />
          <FormInput
            autoFocus={true}
            iconType="user"
            defaultValues={inputUser.Email ? inputUser.Email : ''}
            textLabel={'Email'}
            placeHolder={'Email'}
            textName={'Email'}
            keyboardType="email-address"
            errorobj={errors}
            refs={EmailRef}
            refField={() => PasswordRef.current.focus()}
          />

          <FormInput
            iconType="lock"
            defaultValues={inputUser.Password ? inputUser.Password : ''}
            textLabel={'Password'}
            placeHolder={'Password'}
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
        </FormProvider>

        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <CheckBox
            value={isSelected}
            onValueChange={setSelection}
            style={{alignSelf: 'center'}}
          />
          <Text style={{margin: 8}}>Remember me ?</Text>
        </View>

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
          onPress={handleSubmit(onLoginSubmit)}
        />

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* {Platform.OS === 'android' ? (
          <View>
            <SocialButton
              buttonTitle="Sign In with Facebook"
              btnType="facebook"
              color="#4867aa"
              backgroundColor="#e6eaf4"
              onPress={() => fbLogin()}
            />

            <SocialButton
              buttonTitle="Sign In with Google"
              btnType="google"
              color="#de4d41"
              backgroundColor="#f5e7ea"
              onPress={() => googleLogin()}
            />
          </View>
        ) : null} */}

        <TouchableOpacity
          style={styles.forgotButton}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.navButtonText}>
            Don't have an account? Register here
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </ScrollView>
    </>
  );
};

export default React.memo(LoginScreen);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    // backgroundColor: '#fff',
  },
  logo: {
    height: 150,
    width: 320,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
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
});
