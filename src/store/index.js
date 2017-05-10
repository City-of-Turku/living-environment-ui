import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import createReducer from '../reducers';

let asyncReducers = {};
const middleware = [

  promiseMiddleware(),
  logger,
];

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose;

const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(...middleware))
);

export function injectAsyncReducer(reducer) {
  asyncReducers = { ...asyncReducers, ...reducer };
  store.replaceReducer(createReducer(asyncReducers));
}

export default store;
