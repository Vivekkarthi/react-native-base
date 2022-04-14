import {combineReducers} from 'redux';
import AuthStateReducer, {RESET_STORE} from './actions/AuthState';
import HomeStateReducer from './actions/HomeState';

const appReducer = combineReducers({
  AuthState: AuthStateReducer,
  HomeState: HomeStateReducer,
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
  // console.log('statestate', state);
  return appReducer(state, action);
};

export default rootReducer;
