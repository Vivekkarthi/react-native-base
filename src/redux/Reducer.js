import {combineReducers} from 'redux';
import AuthStateReducer, {RESET_STORE} from './actions/AuthState';
import BoxStateReducer from './actions/BoxState';
import HomeStateReducer from './actions/HomeState';
import MobileNotificatationStateReducer from './actions/MobileNotificationState';
import NotificatationStateReducer from './actions/NotificationState';
import TicketStateReducer from './actions/SupportTicketState';
import PackageStateReducer from './actions/PackageState';

const appReducer = combineReducers({
  AuthState: AuthStateReducer,
  HomeState: HomeStateReducer,
  NotificationState: NotificatationStateReducer,
  TicketStateState: TicketStateReducer,
  BoxState: BoxStateReducer,
  MobileNotificationState: MobileNotificatationStateReducer,
  PackageState: PackageStateReducer,
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
