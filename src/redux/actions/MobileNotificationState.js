import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest} from '../../utils/Handlers';

export const initialState = {
  mobilenotificationDetails: [],
};

export const MOBILENOTIFICATION_SUCCESS =
  'HomeState/MOBILENOTIFICATION_SUCCESS';
export const MOBILENOTIFICATION_FAILURE =
  'HomeState/MOBILENOTIFICATION_FAILURE';

export function fetchNotifyData(CustID, fromDate, toDate) {
  const queryParams = `sK=token&sfromdate=${fromDate}&stodate=${toDate}&custid=${CustID}`;
  const params = {
    url: ENDPOINTURL.MemberMobileNotification,
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

export const saveMemberMobileNotificationDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: MOBILENOTIFICATION_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: MOBILENOTIFICATION_FAILURE,
        payload: [],
      });
    }
  };
};

export default function MobileNotificatationStateReducer(
  state = initialState,
  action,
) {
  switch (action.type) {
    case MOBILENOTIFICATION_SUCCESS:
      return {
        ...state,
        mobilenotificationDetails: action.payload,
      };
    case MOBILENOTIFICATION_FAILURE:
      return {
        ...state,
        mobilenotificationDetails: {},
      };
    default:
      return state;
  }
}
