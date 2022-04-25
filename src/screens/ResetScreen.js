import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {useForm, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import {resetPassSchema} from '../utils/ValidateSchema';

import {isEmpty} from 'lodash';
import {Loader} from '../components/Loader';
import {COLORS, SIZES} from '../constants';
import AppStatusBar from '../components/AppStatusBar';
import {Appbar} from 'react-native-paper';

const ResetScreen = ({navigation}) => {
  const [inputUser, setInputUser] = useState({Email: '', Password: ''});
  const [loader, setLoader] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const EmailRef = useRef(null);

  const methods = useForm({
    criteriaMode: 'all',
    defaultValues: {
      Email: '',
      Password: '',
    },
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(resetPassSchema),
  });
  const {
    handleSubmit,
    formState: {errors},
  } = methods;

  const onResetSubmit = async user => {
    try {
      setLoginError(null);
      // setLoader(true);
      Alert.alert('You will receive email with password for reset password');
      const formData = {
        Email: user.Email,
      };
      setInputUser(() => formData);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  };

  return (
    <>
      {/* <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.background,
          position: 'relative',
        }}> */}
      {/* <AntDesignIcon
        name="arrowleft"
        style={{
          fontSize: 30,
          paddingTop: SIZES.base * 2,
          paddingLeft: SIZES.base * 2,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      /> */}
      <Appbar.Header statusBarHeight={38}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Restore Password" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={[styles.container]}>
        <AppStatusBar colorPalete="WHITE" bg={COLORS.background} />

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
          <Text style={styles.text}>Restore Password</Text>
          <FormProvider {...methods}>
            <View style={{marginBottom: SIZES.base}}>
              <Text
                style={{
                  fontSize: 16,
                  opacity: 0.5,
                  marginBottom: SIZES.base,
                  color: '#0d8e8a',
                }}>
                Email Address
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
              />
            </View>
            <Text
              style={{
                fontSize: 16,
              }}>
              You will receive email with password reset link.
            </Text>
          </FormProvider>

          <FormButton
            buttonTitle="Sign In"
            isPrimary={true}
            style={{
              marginVertical: SIZES.base * 2,
            }}
            onPress={handleSubmit(onResetSubmit)}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: SIZES.base,
            }}>
            <TouchableOpacity
              style={{
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate('Signup');
              }}></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* </SafeAreaView> */}
    </>
  );
};

export default React.memo(ResetScreen);

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
