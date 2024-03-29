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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FormProvider, useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
// import Toast from 'react-native-simple-toast';
import {yupResolver} from '@hookform/resolvers/yup';
import {Loader} from '../components/Loader';
import {COLORS, SIZES} from '../constants';
import {addUserSchema} from '../utils/ValidateSchema';
import {memberAdduser} from '../redux/actions/AuthState';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AppStatusBar from '../components/AppStatusBar';
import {isEmpty} from 'lodash';
import StaticBottomTabs from '../components/StaticBottomTabs';
import {useSelector} from 'react-redux';

const UserDetailScreen = ({navigation, route}) => {
  const [inputUser, setInputUser] = useState({
    Name: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
  });
  const [loader, setLoader] = useState(false);
  const [addUserError, setAddUserError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pwdVisible, setPwdVisible] = useState(true);
  const {loggedMember} = useSelector(state => state.AuthState);

  //

  const methods = useForm({
    defaultValues: {
      Name: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
    },
    resolver: yupResolver(addUserSchema),
  });
  const {
    handleSubmit,
    formState: {errors},
  } = methods;

  const NameRef = useRef(null);
  const EmailRef = useRef(null);
  const PhoneNumberRef = useRef(null);
  const PasswordRef = useRef(null);

  const onUserSubmit = async user => {
    setLoader(true);
    const formData = {
      Name: user.Name,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      Password: user.Password,
    };
    setInputUser(() => formData);
    memberAdduser(user, loggedMember)
      .then(async resp => {
        if (resp === 'Success') {
          //Good
          setLoader(false);
          navigation.navigate('Users');
        } else {
          // Not Good
          setLoader(false);
          setAddUserError(resp);
        }
      })
      .catch(error => {
        setLoader(false);
        setAddUserError(error.message);
        // Toast.showWithGravity(error.message, Toast.LONG, Toast.BOTTOM);
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
        </FormProvider>

        {!isEmpty(addUserError) ? (
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Lato-Regular',
              textAlign: 'center',
              color: '#D83F50',
            }}>
            {addUserError}
          </Text>
        ) : null}

        <FormButton
          buttonTitle="Save"
          isPrimary={true}
          style={{
            marginVertical: SIZES.base * 2,
          }}
          onPress={handleSubmit(onUserSubmit)}
        />
      </View>
    );
  };

  return (
    <>
      <FlatList
        style={[{flex: 1}, styles.container]}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        data={[{ID: '1'}]}
        keyExtractor={item => `${item.ID}`}
        renderItem={() => (
          <View>
            <View style={styles.MainContainer}>
              <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
              <Ionicons
                name="ios-person-circle-outline"
                size={23}
                color={COLORS.primary}
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  marginBottom: 20,
                }}>
                <Text style={styles.f18}> Add User</Text>
              </Ionicons>
            </View>
            <AppStatusBar colorPalete="WHITE" bg={COLORS.white} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 10,
              }}>
              <Button mode="contained" onPress={() => navigation.goBack()}>
                Back
              </Button>
            </View>
            {loader ? <Loader /> : null}

            <View
              style={{
                backgroundColor: COLORS.lightGray,
                width: '100%',
                borderTopStartRadius: SIZES.radius * 2,
                borderTopEndRadius: SIZES.radius * 2,
                padding: SIZES.base * 2,
              }}>
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
            </View>
          </View>
        )}
      />
      <StaticBottomTabs navigation={navigation} routeName={route.name} />
    </>
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
