import React, {useState, useRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import {Button} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FormProvider, useForm} from 'react-hook-form';
import AppStatusBar from '../components/AppStatusBar';
import {COLORS, SIZES} from '../constants';
import {yupResolver} from '@hookform/resolvers/yup';
import {isEmpty} from 'lodash';
import FormButton from '../components/FormButton';
//import styles from '../styles/AppStyles';
import FormInput from '../components/FormInput';
import {registerSchema} from '../utils/ValidateSchema';

const UserDetailScreen = ({navigation, route}) => {
    const [inputUser, setInputUser] = useState({
        Name: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        ControllerId: '',
      });
      const [loader, setLoader] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(true);

  // const toast = useToast();

  const methods = useForm({
    defaultValues: {
      Name: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
      ControllerId: '',
    },
    resolver: yupResolver(registerSchema),
  });
  const {
    handleSubmit,
    formState: {errors},
  } = methods;

  const NameRef = useRef(null);
  const EmailRef = useRef(null);
  const PhoneNumberRef = useRef(null);
  const PasswordRef = useRef(null);
  const ControllerRef = useRef(null);

  const onRegisterSubmit = async user => {
    setLoader(true);
    const formData = {
      Name: user.Name,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      Password: user.Password,
      ControllerId: user.ControllerId,
    };
    setInputUser(() => formData);
    memberRegister(user, navigation)
      .then(async resp => {
        if (resp === 'success') {
          //Good
          // toast.show('You have registered successfully.', {
          //   type: 'custom_type',
          //   animationDuration: 100,
          //   data: {
          //     type: 'success',
          //     title: 'Success',
          //   },
          // });
          setLoader(false);
          navigation.navigate('Login');
        } else {
          // Not Good
          setLoader(false);
          setRegistrationError(resp);
          // toast.show(resp, {
          //   type: 'custom_type',
          //   animationDuration: 100,
          //   data: {
          //     type: 'error',
          //     title: 'Failure',
          //   },
          // });
        }
      })
      .catch(error => {
        setLoader(false);
        setRegistrationError(error.message);
        // toast.show(error.message, {
        //   type: 'custom_type',
        //   animationDuration: 100,
        //   data: {
        //     type: 'error',
        //     title: 'Failure',
        //   },
        // });
      });
  };
  const Category = ['Billing', 'Technical Support', 'Others'];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      <View style={styles.MainContainer}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
        <Ionicons
          name="add-circle"
          size={23}
          color={COLORS.primary}
          style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
          <Text style={styles.f18}>Add User</Text>
        </Ionicons>

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'flex-end'}}>
          Go Back
        </Button>
      </View>
      <View>
        <FormProvider>
          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{
                fontSize: 16,
                opacity: 0.5,
                marginBottom: SIZES.base,
                color: '#0d8e8a',
                fontWeight: 'bold',
              }}>
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
              refs={NameRef}
              refField={() => EmailRef.current.focus()}
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
              Email
            </Text>
            <FormInput
              iconType="mail"
              defaultValues={inputUser.Email}
              textLabel={'Email'}
              // placeHolder={'Email'}
              textName={'Email'}
              keyboardType="default"
              errorobj={errors}
              refs={EmailRef}
              refField={() => PhoneNumberRef.current.focus()}
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
              Mobile
            </Text>
            <FormInput
              iconType="phone"
              defaultValues={inputUser.PhoneNumber}
              textLabel={'Mobile'}
              textName={'PhoneNumber'}
              keyboardType="phone-pad"
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
            <FormInput
              iconType="lock"
              defaultValues={inputUser.Password}
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
              refField={() => ControllerRef.current.focus()}
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
              refs={ControllerRef}
            />
          </View>
        </FormProvider>

        {!isEmpty(registrationError) ? (
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Lato-Regular',
              textAlign: 'center',
              color: '#D83F50',
            }}>
            {registrationError}
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
      </View>
    </SafeAreaView>
  );
};

export default UserDetailScreen;

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
  