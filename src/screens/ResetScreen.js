import React, {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Image} from 'react-native';
import {COLORS, SIZES} from '../constants';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SignInSignUpSVG from '../../assets/images/SignInOrSignUp.svg';
import Button from '../components/Button';
import LoginSvg from '../Svg/LoginSvg';

const ResetScreen = ({navigation}) => {
  const [activeInput, setActiveInput] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SIZES.base * 2,
        position: 'relative',
      }}>
      <AntDesignIcon
        name="arrowleft"
        style={{fontSize: 30}}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <LoginSvg height={500} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}>
        <View
          style={{
            backgroundColor: COLORS.lightGray,
            width: '100%',
            borderTopStartRadius: SIZES.radius * 2,
            borderTopEndRadius: SIZES.radius * 2,
            padding: SIZES.base * 2,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              marginVertical: SIZES.base * 2,
            }}>
            Reset Password
          </Text>
          <View style={{marginBottom: SIZES.base}}>
            <Text
              style={{fontSize: 16, opacity: 0.5, marginBottom: SIZES.base}}>
              Email Address
            </Text>
            <TextInput
              onFocus={() => setActiveInput('email')}
              style={{
                padding: SIZES.base,
                backgroundColor: COLORS.white,
                borderRadius: 5,
                paddingVertical: SIZES.base * 1.5,
                borderWidth: 1.5,
                borderColor:
                  activeInput == 'email' ? COLORS.primary : COLORS.white,
              }}
            />
          </View>

          <Button
            label={'Send Instructions'}
            isPrimary={true}
            style={{
              marginVertical: SIZES.base * 2,
            }}
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
              You will receive email with password reset link
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ResetScreen);
