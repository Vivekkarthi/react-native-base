import moment from 'moment';
// import {HomeData} from '../../model/data';
import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest} from '../../utils/Handlers';
import {store} from '../Store';

export const initialState = {
  homeDetails: {},
  homeNotification: new Date(),
  homeMobileNotification: new Date(),
};

export const HOME_SUCCESS = 'HomeState/HOME_SUCCESS';
export const HOME_FAILURE = 'HomeState/HOME_FAILURE';

export const HOME_NOTIFICATION = 'HomeState/HOME_NOTIFICATION';
export const HOME_MOBILE_NOTIFICATION = 'HomeState/HOME_MOBILE_NOTIFICATION';

export const fetchHomeData = (LoginId, controllerId, getDate) => {
  const queryParams = `ihwidx=${controllerId}&sK=token&hardwareid=&snotifyfrom=${
    getDate !== ''
      ? getDate
      : moment(store.getState().HomeState.homeNotification).format('YYYY-MM-DD')
  }`;

  const params = {
    url: ENDPOINTURL.MemberHome,
    queryParams,
  };
  return getRequest(params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const callOpenCloseBox = (LoginId, controllerId, PkgLock) => {
  const queryParams = `ihwidx=${controllerId}&sK=token&hardwareid=&pkgstate=${PkgLock}`;

  const params = {
    url: ENDPOINTURL.MemberLock,
    queryParams,
  };
  return getRequest(params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const saveMemberHomeDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: HOME_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: HOME_FAILURE,
        payload: {},
      });
    }
  };
};

export const saveMemberHomeNotifications = (mobile, data) => {
  return dispatch => {
    if (mobile) {
      dispatch({
        type: HOME_MOBILE_NOTIFICATION,
        payload: data,
      });
    } else {
      dispatch({
        type: HOME_NOTIFICATION,
        payload: data,
      });
    }
  };
};

export default function HomeStateReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_SUCCESS:
      return {
        ...state,
        homeDetails: action.payload,
      };
    case HOME_FAILURE:
      return {
        ...state,
        homeDetails: {},
      };
    case HOME_NOTIFICATION:
      return {
        ...state,
        homeNotification: action.payload,
      };
    case HOME_MOBILE_NOTIFICATION:
      return {
        ...state,
        homeMobileNotification: action.payload,
      };
    default:
      return {...state};
  }
}
