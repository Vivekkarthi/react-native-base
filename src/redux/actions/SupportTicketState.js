import {isEmpty} from 'lodash';
import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest, postRequest} from '../../utils/Handlers';

export const initialState = {
  ticketDetails: [],
  ticketResponseDetails: [],
  URLDetails: '',
};

export const TICKET_SUCCESS = 'TICKETState/TICKET_SUCCESS';
export const TICKET_FAILURE = 'TICKETState/TICKET_FAILURE';
export const TICKET_RESPONSE_SUCCESS = 'TICKETState/TICKET_RESPONSE_SUCCESS';
export const TICKET_RESPONSE_FAILURE = 'TICKETState/TICKET_RESPONSE_FAILURE';
export const URL_SUCCESS = 'URL_SUCCESS';
export const URL_FAILURE = 'URL_FAILURE';

export const addNewTicket = (
  loggedMember,
  item,
  description,
  hasSupportData,
) => {
  const queryParams = `sK=token&iUSERID=${loggedMember.USERRECORDID}&iCustID=${
    loggedMember.CustID
  }&iSCID=${item}&sMessage=${description}&iSTID=${
    !isEmpty(hasSupportData) ? Number(hasSupportData.STID) : 0
  }`;

  const params = {
    url: ENDPOINTURL.MemberSaveTicketResponse,
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

export function fetchTicketData(custID, fromDate, toDate) {
  const queryParams = `sK=token&sDateFrom=${fromDate}&sDateTo=${toDate}&iCustID=${custID}`;
  const params = {
    url: ENDPOINTURL.MemberGetTicketList,
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

export function fetchTicketResponseData(STID) {
  const queryParams = `sK=token&iSTID=${STID}`;
  const params = {
    url: ENDPOINTURL.MemberGetTicketResponse,
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

export function memberManualURL() {
  const queryParams = 'sK=token';
  const params = {
    url: ENDPOINTURL.MemberManualURL,
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

export const saveTicketDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: TICKET_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: TICKET_FAILURE,
        payload: {},
      });
    }
  };
};

export const saveURLDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: URL_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: URL_FAILURE,
        payload: {},
      });
    }
  };
};

export const saveTicketResponseDetails = data => {
  return dispatch => {
    if (data) {
      dispatch({
        type: TICKET_RESPONSE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: TICKET_RESPONSE_FAILURE,
        payload: {},
      });
    }
  };
};

export default function TicketStateReducer(state = initialState, action) {
  switch (action.type) {
    case TICKET_SUCCESS:
      return {
        ...state,
        ticketDetails: action.payload,
      };
    case TICKET_FAILURE:
      return {
        ...state,
        ticketDetails: [],
      };
    case TICKET_RESPONSE_SUCCESS: {
      return {
        ...state,
        ticketResponseDetails: action.payload,
      };
    }
    case TICKET_RESPONSE_FAILURE: {
      return {
        ...state,
        ticketResponseDetails: [],
      };
    }
    case URL_SUCCESS: {
      return {
        ...state,
        URLDetails: action.payload,
      };
    }
    case URL_FAILURE: {
      return {
        ...state,
        URLDetails: [],
      };
    }
    default:
      return state;
  }
}
