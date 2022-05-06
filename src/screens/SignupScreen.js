import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from 'react-native';
import {FormProvider, useForm} from 'react-hook-form';
// import {useToast} from 'react-native-toast-notifications';
import {yupResolver} from '@hookform/resolvers/yup';
import {Loader} from '../components/Loader';
import {COLORS, SIZES} from '../constants';
import {registerSchema} from '../utils/ValidateSchema';
import {memberRegister} from '../redux/actions/AuthState';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AppStatusBar from '../components/AppStatusBar';
import {isEmpty} from 'lodash';

const SignupScreen = ({navigation}) => {
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

  const renderItem = ({item, index}) => {
    return (
      <View>
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
              Mobile/ Login ID
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
    );
  };

  return (
    <>
      <FlatList
        style={styles.container}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        data={[{ID: '1'}]}
        keyExtractor={item => `${item.ID}`}
        renderItem={() => (
          <View contentContainerStyle={[styles.container]}>
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
          </View>
        )}
      />
    </>
  );
};

export default SignupScreen;

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
