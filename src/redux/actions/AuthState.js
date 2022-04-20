import {
  clearAppData,
  getRequest,
  postRequest,
  putRequest,
} from '../../utils/Handlers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isEqual} from 'lodash';

import auth from '@react-native-firebase/auth';
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

export function memberLogin(userData, navigation) {
  const queryString = `sK=""&suid=${userData.Name}&spass=${userData.Password}&sip`;
  const queryParams = new URLSearchParams(queryString);
  const params = {
    url: ENDPOINTURL.MemberLogin,
    data: userData,
    token: '',
    queryParams,
  };
  return getRequest(params)
    .then(response => {
      AsyncStorage.setItem('loggedUser', JSON.stringify(response));
      return response;
    })
    .catch(error => {
      throw error;
    });
}

export function memberRegister(userData, navigation) {
  const queryString = `sK=token&namex=${userData.Name}&spass=${userData.Password}&semail=${userData.Email}&sphone=${userData.PhoneNumber}&sidx=${userData.ControllerId}&icustid=0`;
  const queryParams = new URLSearchParams(queryString);
  const params = {
    url: ENDPOINTURL.MemberRegister,
    data: userData,
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
      auth()
        .signOut()
        .then(() => {
          console.log('user sign out.....');
        })
        .catch(autherror => {
          console.log('autherror', autherror);
        });
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
