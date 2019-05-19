import { createStore, applyMiddleware } from 'redux';
import { throttle } from 'lodash';
import logger from 'redux-logger';

import reducer from './reducer';

import { loadState, saveState } from './localstorage';

const persistedState = loadState();

const USE_LOGGER = true;

const middlewares = [].concat(!USE_LOGGER || logger).filter(mw => mw !== true);

const store = createStore(
  reducer,
  persistedState,
  applyMiddleware(...middlewares),
);


store.subscribe(throttle(() => {
  saveState({
    tasks: store.getState().tasks
  });
}, 1000));

export default store;
