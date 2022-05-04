import {combineReducers} from 'redux';
import AuthStateReducer, {RESET_STORE} from './actions/AuthState';
import BoxStateReducer from './actions/BoxState';
import HomeStateReducer from './actions/HomeState';

const appReducer = combineReducers({
  AuthState: AuthStateReducer,
  HomeState: HomeStateReducer,
  BoxState: BoxStateReducer,
});

// reset the state of a redux store
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    if (state.AuthState.rememberLogin) {
      state = {
        AuthState: {
          isUserLoggedIn: false,
          loggedMember: {},
          rememberLogin: true,
        },
      };
    } else {
      state = undefined;
    }
  }
  return appReducer(state, action);
};

export default rootReducer;
