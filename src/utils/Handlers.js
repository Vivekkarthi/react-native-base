import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {isEmpty} from 'lodash';
import Config from 'react-native-config';

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

const AuthHeaders = (token, cancelToken) => {
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  !isEmpty(cancelToken) ? (axiosConfig.cancelToken = cancelToken.token) : null;
  !isEmpty(token) ? (axiosConfig.headers['usertoken'] = token) : null;
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
  console.log('error.code+++', error.code);
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

const getRequest = (props, cancelToken) => {
  console.log(
    '****************************',
    `${Config.API_URL}${props.url}/?${props.queryParams}`,
  );
  return axios
    .get(`${Config.API_URL}${props.url}/?${props.queryParams}`)
    .then(response => {
      console.log('Success response ', response);
      if (response.data) {
        return response.data;
      }
    })
    .catch(error => {
      console.log('===================== response:: ', error.response.data);
      // if (error.response.status === 500 || error.response.status === 403) {
      //   showUnderMaintain(props.navigation);
      // } else {
      //   throw error.response.data;
      // }
      throw error.response.data;
    });
};

const postRequest = (props, cancelToken) => {
  return axios
    .post(
      Config.API_URL + props.url,
      props.data,
      AuthHeaders(props.token, cancelToken),
    )
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
    .put(Config.API_URL + props.url, props.data, AuthHeaders(props.token))
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

export {
  Headers,
  AuthHeaders,
  getLocalUserDetails,
  firebaseAuthErrors,
  postRequest,
  putRequest,
  getRequest,
  clearAppData,
};
