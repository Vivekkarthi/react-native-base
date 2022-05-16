import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest} from '../../utils/Handlers';

export const initialState = {
  notificationDetails: [],
};

export const NOTIFICATION_SUCCESS = 'HomeState/NOTIFICATION_SUCCESS';
export const NOTIFICATION_FAILURE = 'HomeState/NOTIFICATION_FAILURE';

export function fetchNotifyData(controllerId, fromDate, toDate) {
  const queryParams = `sK=token&snotifyfrom=${fromDate}&snotifyto=${toDate}&ihwidx=${controllerId}&sHWname=`;
  const params = {
    url: ENDPOINTURL.MemberNotification,
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

export const saveMemberNotificationDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: NOTIFICATION_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: NOTIFICATION_FAILURE,
        payload: [],
      });
    }
  };
};

export default function NotificatationStateReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationDetails: action.payload,
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        notificationDetails: {},
      };
    default:
      return state;
  }
}
