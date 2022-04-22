import moment from 'moment';
// import {HomeData} from '../../model/data';
import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest} from '../../utils/Handlers';

export const initialState = {
  homeDetails: {},
};

export const HOME_SUCCESS = 'HomeState/HOME_SUCCESS';
export const HOME_FAILURE = 'HomeState/HOME_FAILURE';

export const fetchHomeData = controllerId => {
  const queryParams = `sK=token&hardwareid=${controllerId}&snotifyfrom=${moment().format(
    'YYYY-MM-DD',
  )}`;
  const params = {
    url: ENDPOINTURL.MemberHome,
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
    default:
      return state;
  }
}
