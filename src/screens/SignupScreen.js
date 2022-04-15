import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {saveMemberDetails} from '../redux/actions/AuthState';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {registerSchema} from '../utils/ValidateSchema';
import {isEmpty} from 'lodash';
import {firebaseAuthErrors} from '../utils/Handlers';
import {Loader} from '../components/Loader';
import {COLORS, SIZES} from '../constants';

const SignupScreen = ({navigation}) => {
  const [inputUser, setInputUser] = useState({
    Name: '',
    Email: '',
    Password: '',
    ControllerId: '',
  });
  const [loader, setLoader] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(true);
  const [confirmPwdVisible, setConfirmPwdVisible] = useState(true);
  const [firebaseError, setFirebaseError] = useState(null);

  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: {errors},
  } = methods;

  const NameRef = useRef(null);
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const ControllerRef = useRef(null);

  const dispatch = useDispatch();

  const onRegisterSubmit = async user => {
    try {
      setRegisterError(null);
      setLoader(true);
      const formData = {
        Name: user.Name,
        Email: user.Email,
        Password: user.Password,
        ControllerId: user.ControllerId,
      };
      setInputUser(() => formData);
      await auth()
        .createUserWithEmailAndPassword(user.Email, user.Password)
        .then(authResponse => {
          if (authResponse.user) {
            setInputUser({
              ...inputUser,
              Name: user.Name,
              Email: user.Email,
              Password: user.Password,
              ControllerId: user.ControllerId,
            });
            dispatch(saveMemberDetails(authResponse.user));
            setLoader(false);
          }
        })
        //we need to catch the whole sign up process if it fails too.
        .catch(error => {
          setRegisterError(null);
          const response = firebaseAuthErrors(error);
          setFirebaseError(response);
          setLoader(false);
        });
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <View>
        <FormProvider {...methods}>
          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Name
            </Text>
            <FormInput
              iconType="edit"
              autoFocus={true}
              defaultValues={inputUser.Name}
              textLabel={'Name'}
              // placeHolder={'Name'}
              textName={'Name'}
              keyboardType="default"
              errorobj={errors}
              validationError={registerError}
              refs={NameRef}
              refField={() => EmailRef.current.focus()}
            />
          </View>

          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Email
            </Text>
            <FormInput
              iconType="mail"
              defaultValues={inputUser.Email}
              textLabel={'Email'}
              // placeHolder={'Email'}
              textName={'Email'}
              keyboardType="email-address"
              errorobj={errors}
              validationError={registerError}
              refs={EmailRef}
              refField={() => PasswordRef.current.focus()}
            />
          </View>

          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Password
            </Text>
            <FormInput
              iconType="lock"
              defaultValues={inputUser.Password}
              textLabel={'Password'}
              // placeHolder={'Password'}
              textName={'Password'}
              keyboardType="default"
              errorobj={errors}
              validationError={registerError}
              showHidePassword={() => {
                setPwdVisible(!pwdVisible);
                setShowPassword(!showPassword);
              }}
              showPassword={showPassword}
              pwdVisible={pwdVisible}
              refs={PasswordRef}
              refField={() => ControllerRef.current.focus()}
            />
          </View>

          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Controller ID
            </Text>
            <FormInput
              iconType="idcard"
              defaultValues={inputUser.ControllerId}
              textLabel={'Controller Id'}
              // placeHolder={'Name'}
              textName={'ControllerId'}
              keyboardType="default"
              errorobj={errors}
              validationError={registerError}
              refs={ControllerRef}
            />
          </View>
        </FormProvider>

        {!isEmpty(firebaseError) ? (
          <Text
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Lato-Regular',
              color: '#D83F50',
            }}>
            {firebaseError}
          </Text>
        ) : null}

        {!isEmpty(registerError) ? (
          <Text
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              fontSize: 16,
              textAlign: 'center',
              fontFamily: 'Lato-Regular',
              color: '#D83F50',
            }}>
            {registerError}
          </Text>
        ) : null}

        <FormButton
          buttonTitle="Create Account"
          isPrimary={true}
          style={{
            marginVertical: SIZES.base * 2,
          }}
          onPress={handleSubmit(onRegisterSubmit)}
        />

        {/* <View style={styles.textPrivate}>
          <Text style={styles.color_textPrivate}>
            By registering, you confirm that you accept our{' '}
          </Text>
          <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
            <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
              Terms of service
            </Text>
          </TouchableOpacity>
          <Text style={styles.color_textPrivate}> and </Text>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Privacy Policy
          </Text>
        </View> */}
      </View>
    );
  };

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
        <Text style={styles.text}>Create Account</Text>

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
            renderItem={renderItem}
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
            Already have an account ?
          </Text>
          <TouchableOpacity
            style={{
              padding: 10,
            }}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: SIZES.base,
                color: COLORS.primary,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});
