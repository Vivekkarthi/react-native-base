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
        {!isEmpty(loggedMember) ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default NavigateProviders;
