import {HomeData} from '../../model/data';

export const initialState = {
  homeDetails: HomeData,
};

export const HOME_SUCCESS = 'HomeState/HOME_SUCCESS';

export const fetchHomeData = () => {
  return dispatch => {
    dispatch({
      type: HOME_SUCCESS,
      payload: HomeData,
    });
  };
};

export default function HomeStateReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_SUCCESS:
      return {
        ...state,
        homeDetails: action.payload,
      };
    default:
      return state;
  }
}
