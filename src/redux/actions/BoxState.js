import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest, postRequest} from '../../utils/Handlers';

export const initialState = {
  boxDetails: {},
};

export const BOX_SUCCESS = 'BoxState/BOX_SUCCESS';
export const BOX_FAILURE = 'BoxState/BOX_FAILURE';

export const fetchBoxData = (LoginId, controllerId) => {
  const queryParams = `ihwidx=${controllerId}&sK=token&hardwareid=`;

  const params = {
    url: ENDPOINTURL.MemberMyBox,
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

export const saveMyBoxDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: BOX_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: BOX_FAILURE,
        payload: {},
      });
    }
  };
};

export const callAlarmOnOffBox = (LoginId, controllerId, Alarm) => {
  const queryParams = `ihwidx=${controllerId}&sK=token&hardwareid=&alarmstate=${Alarm}`;

  const params = {
    url: ENDPOINTURL.MemberUpdateAlarm,
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

export const callPIRSensor = (LoginId, controllerId, Sensor) => {
  const queryParams = `&sK=token&iHWID=${controllerId}&ivalue=${Sensor}`;

  const params = {
    url: ENDPOINTURL.MemberUpdatePIR,
    queryParams,
  };
  return postRequest(params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const callInternalOrExternalCameraOnBox = (
  LoginId,
  controllerId,
  CameraType,
) => {
  const queryParams = `ihwidx=${controllerId}&sK=token&hardwareid=&cameratype=${CameraType}`;

  const params = {
    url: ENDPOINTURL.MemberUpdateOnDemandCamera,
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

export const updateControllerPassword = (userData, controllerId) => {
  const queryParams = `sK=token&iHWID=${controllerId}&sPWD=${userData.Password}`;
  const params = {
    url: ENDPOINTURL.MemberUpdateControllerPassword,
    token: '',
    queryParams,
  };
  console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%', params);
  return postRequest(params)
    .then(resp => {
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', resp);
      return resp;
    })
    .catch(error => {
      console.log('################# Error #################', error);
      throw error;
    });
};

export default function BoxStateReducer(state = initialState, action) {
  switch (action.type) {
    case BOX_SUCCESS:
      return {
        ...state,
        boxDetails: action.payload,
      };
    case BOX_FAILURE:
      return {
        ...state,
        boxDetails: {},
      };
    default:
      return state;
  }
}
