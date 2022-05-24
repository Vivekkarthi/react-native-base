import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest} from '../../utils/Handlers';

export const initialState = {
  packageDetails: [],
};

export const PACKAGE_SUCCESS = 'PACKAGE_SUCCESS';
export const PACKAGE_FAILURE = 'PACKAGE_FAILURE';

export function fetchNotifyData(loggedMember, fromDate, toDate) {
  const queryParams = `sK=token&sidx=${loggedMember.ControllerName}&sfromdate=${fromDate}&stodate=${toDate}`;
  const params = {
    url: ENDPOINTURL.MemberPackage,
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

export const saveMemberPackageDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: PACKAGE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: PACKAGE_FAILURE,
        payload: [],
      });
    }
  };
};

export default function PackageStateReducer(state = initialState, action) {
  switch (action.type) {
    case PACKAGE_SUCCESS:
      return {
        ...state,
        packageDetails: action.payload,
      };
    case PACKAGE_FAILURE:
      return {
        ...state,
        packageDetails: {},
      };
    default:
      return state;
  }
}
