import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './Reducer';
import {composeWithDevTools} from 'redux-devtools-extension';

const enhancer = composeWithDevTools(applyMiddleware(thunk, logger));

const persistConfig = {
  key: 'root',
  debug: true,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer, enhancer);
store.subscribe(() => {
  store.getState();
});
export const persistor = persistStore(store);
