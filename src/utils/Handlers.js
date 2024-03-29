import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {isEmpty} from 'lodash';
import {COLORS} from '../constants';
import {CONFIG} from './Config';

const Headers = () => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
  };
  return axiosConfig;
};

const AuthHeaders = token => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  !isEmpty(token) ? (axiosConfig.headers['token'] = token) : null;
  return axiosConfig;
};

const getLocalUserDetails = async () => {
  await AsyncStorage.getItem('loggedUser').then(value => {
    const loggedUserDetails = JSON.parse(value);
    if (loggedUserDetails) {
      return loggedUserDetails;
    }
  });
};

const firebaseAuthErrors = error => {
  switch (error.code) {
    case 'auth/user-not-found':
      return 'There is no user record corresponding to this identifier. The user may have been deleted.';

    case 'auth/invalid-email':
      return 'That email address is invalid!';

    case 'auth/email-already-in-use':
      return 'That email address is already in use!';

    case 'auth/operation-not-allowed':
      return 'email/password accounts are not enabled!';

    case 'auth/wrong-password':
      return 'The password is invalid or the user does not have a password.';

    case 'auth/weak-password':
      return 'Please set a strong password!';

    case 'auth/network-request-failed':
      return 'Network error or Timeout!';

    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials.';

    case 'auth/user-disabled':
      return 'Your account has been disabled please contact us.';

    case 'auth/unknown':
      return 'User has already been linked to the given provider.';

    case 'auth/requires-recent-login':
      return "User won't let you change a password unless you are recently authenticated";

    default:
      return error.message;
  }
};

const getRequest = props => {
  console.log(
    '^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^',
    `${CONFIG.API_URL}${props.url}?${props.queryParams}`,
  );
  return axios
    .get(`${CONFIG.API_URL}${props.url}?${props.queryParams}`)
    .then(response => {
      if (response.data) {
        return response.data;
      }
    })
    .catch(error => {
      console.log('error+++++++++++error: ', error.message);
      throw error.message;
    });
};

const postRequest = props => {
  return axios
    .post(`${CONFIG.API_URL}${props.url}?${props.queryParams}`)
    .then(response => {
      if (response.data) {
        return response.data;
      }
    })
    .catch(error => {
      if (error.response) {
        if (error.response.status === 500 || error.response.status === 403) {
          showUnderMaintain(props.navigation);
          throw null;
        } else {
          throw error.response.data;
        }
      }
    });
};
const putRequest = props => {
  return axios
    .put(CONFIG.API_URL + props.url, props.data, AuthHeaders(props.token))
    .then(response => {
      if (response.data) {
        return response.data;
      }
    })
    .catch(error => {
      if (error.response.status === 500 || error.response.status === 403) {
        showUnderMaintain(props.navigation);
        throw null;
      } else {
        throw error.response.data;
      }
    });
};

const clearAppData = async function () {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const removeKeys = [];
    keys.map((key, index) => {
      if (key !== 'rememberMe' && key !== 'alreadyLaunched') {
        removeKeys.push(key);
      }
    });
    await AsyncStorage.multiRemove(removeKeys);
  } catch (error) {
    console.error('Error clearing app data.');
  }
};

const getColorCode = MsgCode => {
  switch (MsgCode) {
    case 1:
      return COLORS.messageColor1;
    case 2:
      return COLORS.messageColor2;
    case 3:
      return COLORS.messageColor3;
    case 4:
      return COLORS.messageColor4;
    default:
      return COLORS.background;
  }
};

const getTypeOfMsg = MsgCode => {
  switch (MsgCode) {
    case 1:
      return 'Battery';
    case 2:
      return 'Wifi';
    case 3:
      return 'Sensor';
    case 4:
      return 'Others';
    default:
      return 'Others';
  }
};

const getBatteryType = type => {
  switch (type) {
    case 10:
      return 'battery-10';
    case 20:
      return 'battery-20';
    case 30:
      return 'battery-30';
    case 40:
      return 'battery-40';
    case 50:
      return 'battery-50';
    case 60:
      return 'battery-60';
    case 70:
      return 'battery-70';
    case 80:
      return 'battery-80';
    case 90:
      return 'battery-90';
    case 100:
      return 'battery';
    default:
      return 'battery-off-outline';
  }
};
const getBatteryTypeColor = percent => {
  switch (percent) {
    case 10:
      return COLORS.batter10;
    case 20:
      return COLORS.batter20;
    case 30:
      return COLORS.batter30;
    case 40:
      return COLORS.batter40;
    case 50:
      return COLORS.batter50;
    case 60:
      return COLORS.batter60;
    case 70:
      return COLORS.batter70;
    case 80:
      return COLORS.batter80;
    case 90:
      return COLORS.batter90;
    case 100:
      return COLORS.batter100;
    default:
      return COLORS.batter0;
  }
};

const getTemperatureType = type => {
  switch (type) {
    case 10:
      return 'thermometer-1';
    case 20:
      return 'thermometer-1';
    case 30:
      return 'thermometer-2';
    case 40:
      return 'thermometer-2';
    case 50:
      return 'thermometer-3';
    case 60:
      return 'thermometer-3';
    case 70:
      return 'thermometer-3';
    case 80:
      return 'thermometer-3';
    case 90:
      return 'thermometer-4';
    case 100:
      return 'thermometer-4';
    default:
      return 'thermometer-0';
  }
};

const getTemperatureTypeColor = percent => {
  switch (percent) {
    case 10:
      return COLORS.Temperature10;
    case 20:
      return COLORS.Temperature20;
    case 30:
      return COLORS.Temperature30;
    case 40:
      return COLORS.Temperature40;
    case 50:
      return COLORS.Temperature50;
    case 60:
      return COLORS.Temperature60;
    case 70:
      return COLORS.Temperature70;
    case 80:
      return COLORS.Temperature80;
    case 90:
      return COLORS.Temperature90;
    case 100:
      return COLORS.Temperature100;
    default:
      return COLORS.batter0;
  }
};

export {
  Headers,
  AuthHeaders,
  getLocalUserDetails,
  firebaseAuthErrors,
  postRequest,
  putRequest,
  getRequest,
  clearAppData,
  getColorCode,
  getTypeOfMsg,
  getBatteryType,
  getBatteryTypeColor,
  getTemperatureType,
  getTemperatureTypeColor,
};
