import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import {ToastProvider} from 'react-native-toast-notifications';

import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {COLORS} from '../constants';
const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: '#f17012',
  },
  fonts: configureFonts(fontConfig),
};

const NavigateProviders = () => {
  const {loggedMember} = useSelector(state => state.AuthState);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {/* <ToastProvider
          placement="bottom"
          dangerIcon={<MaterialCommunityIcons name="close" color="#fff" />}
          successIcon={
            <MaterialCommunityIcons name="check" color="#fff" size={18} />
          }
          offset={10}
          renderType={{
            custom_type: toast => (
              <View
                style={{
                  maxWidth: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  marginVertical: 4,
                  borderRadius: 8,
                  borderLeftColor:
                    toast.data.type === 'success' ? '#00C851' : '#D83F50',
                  borderLeftWidth: 6,
                  justifyContent: 'center',
                  paddingLeft: 16,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#333',
                    fontWeight: 'bold',
                  }}>
                  {toast.data.title}
                </Text>
                <Text style={{color: '#a3a3a3', marginTop: 2}}>
                  {toast.message}
                </Text>
              </View>
            ),
            with_close_button: toast => (
              <View
                style={{
                  maxWidth: '100%',
                  paddingVertical: 10,
                  backgroundColor: '#fff',
                  marginVertical: 4,
                  borderRadius: 8,
                  borderLeftColor:
                    toast.data.type === 'success' ? '#00C851' : '#D83F50',
                  borderLeftWidth: 6,
                  justifyContent: 'center',
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                }}>
                <Text style={{color: '#a3a3a3', marginRight: 16}}>
                  {toast.message}
                </Text>
                <TouchableOpacity
                  onPress={() => toast.onHide()}
                  style={{
                    marginLeft: 'auto',
                    width: 25,
                    height: 25,
                    borderRadius: 5,
                    backgroundColor: '#333',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '500',
                      marginBottom: 2.5,
                    }}>
                    x
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}> */}
        {!isEmpty(loggedMember) ? <AppStack /> : <AuthStack />}
        {/* </ToastProvider> */}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default NavigateProviders;
