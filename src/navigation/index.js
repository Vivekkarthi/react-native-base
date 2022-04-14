import React, {useCallback, useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

import {useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

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
    <NavigationContainer>
      {!isEmpty(loggedMember) ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigateProviders;
