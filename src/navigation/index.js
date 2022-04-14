import React, {useCallback, useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

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
    primary: 'tomato',
    accent: 'yellow',
  },
  fonts: configureFonts(fontConfig),
};

const NavigateProviders = () => {
  const {loggedMember} = useSelector(state => state.AuthState);

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = useCallback(
    user => {
      if (user) {
        console.log('MAINNNN', user);
      }
      if (initializing) setInitializing(false);
    },
    [initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  if (initializing) return null;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {!isEmpty(loggedMember) ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default NavigateProviders;
