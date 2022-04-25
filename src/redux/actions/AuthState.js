import {clearAppData, getRequest, postRequest} from '../../utils/Handlers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEqual} from 'lodash';
import {NetworkInfo} from 'react-native-network-info';
import DeviceInfo from 'react-native-device-info';
import {ENDPOINTURL} from '../../utils/Constants';

export const initialState = {
  loggedMember: {},
  isUserLoggedIn: false,
  rememberLogin: false,
};

// Actions for Home Module
export const LOGIN_FAILURE = 'AuthState/LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'AuthState/LOGIN_SUCCESS';
export const LOGIN_UPDATE = 'AuthState/LOGIN_UPDATE';
export const GET_REGISTER_SUCCESS = 'AuthState/GET_REGISTER_SUCCESS';
export const GET_REGISTER_FAILURE = 'AuthState/GET_REGISTER_FAILURE';
export const RESET_STORE = 'AuthState/RESET_STORE';

export const REMEMBER_LOGIN = 'AuthState/REMEMBER_LOGIN';

export async function memberLogin(userData, navigation) {
  // Get Local IP
  const ipAddress = await DeviceInfo.getIpAddress().then(ip => ip);
  const queryParams = `sK=token&suid=${userData.PhoneNumber}&spass=${userData.Password}&sip=${ipAddress}`;
  const params = {
    url: ENDPOINTURL.MemberLogin,
    token: '',
    queryParams,
  };
  return getRequest(params)
    .then(userResp => {
      return userResp;
    })
    .catch(error => {
      console.log('################# Error #################', error);
      throw error;
    });
}

export function memberRegister(userData, navigation) {
  const queryParams = `sK=token&namex=${userData.Name}&spass=${userData.Password}&semail=${userData.Email}&sphone=${userData.PhoneNumber}&sidx=${userData.ControllerId}&icustid=0`;
  const params = {
    url: ENDPOINTURL.MemberRegister,
    token: '',
    queryParams,
  };

  return getRequest(params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
}

export const saveMemberDetails = userData => {
  return dispatch => {
    if (userData) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: userData,
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: {},
      });
    }
  };
};

export const rememberMe = (user, isRemember) => {
  return dispatch => {
    isRemember
      ? AsyncStorage.setItem('rememberMe', JSON.stringify(user))
      : AsyncStorage.removeItem('rememberMe');
    dispatch({
      type: REMEMBER_LOGIN,
      payload: isRemember,
    });
  };
};

export function logoutSuccess() {
  clearAppData();
  return dispatch => {
    dispatch({type: RESET_STORE});
  };
}

export default function AuthStateReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_FAILURE:
      return {
        ...state,
        loggedMember: {},
      };
    case LOGIN_SUCCESS:
      return !isEqual(state.loggedMember, action.payload) &&
        !isEqual(state.isUserLoggedIn, true)
        ? {
            ...state,
            loggedMember: action.payload,
            isUserLoggedIn: true,
          }
        : state;
    case GET_REGISTER_SUCCESS:
      return !isEqual(state.loggedMember, action.payload) &&
        !isEqual(state.isUserLoggedIn, true)
        ? {
            ...state,
            loggedMember: action.payload,
            isUserLoggedIn: true,
          }
        : state;
    case GET_REGISTER_FAILURE:
      return {
        ...state,
        loggedMember: {},
      };
    case REMEMBER_LOGIN:
      return {
        ...state,
        rememberLogin: action.payload,
      };
    default:
      return state;
  }
}
