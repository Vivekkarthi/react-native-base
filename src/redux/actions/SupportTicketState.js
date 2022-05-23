import {isEmpty} from 'lodash';
import {ENDPOINTURL} from '../../utils/Constants';
import {getRequest, postRequest} from '../../utils/Handlers';

export const initialState = {
  ticketDetails: [],
};

export const TICKET_SUCCESS = 'TICKETState/TICKET_SUCCESS';
export const TICKET_FAILURE = 'TICKETState/TICKET_FAILURE';

export const addNewTicket = (
  loggedMember,
  item,
  description,
  hasSupportData,
) => {
  const queryParams = `sK=token&iUSERID=${loggedMember.USERRECORDID}&iCustID=${
    loggedMember.CustID
  }&iSCID=${item}&sMessage=${description}&iSTID=${
    !isEmpty(hasSupportData) ? 1 : 0
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

export function fetchTickeResponcetData() {
  const queryParams = `sK=token&iSTID=${custID}`;
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
    default:
      return state;
  }
}
