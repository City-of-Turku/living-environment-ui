import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';

import createReducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

let asyncReducers = {};
const middleware = [
  sagaMiddleware,
  promiseMiddleware(),
  logger,
];

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools({}) : compose;

const store = createStore(
  createReducer(),
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(sagas);

export function injectAsyncReducer(reducer) {
  asyncReducers = { ...asyncReducers, ...reducer };
  store.replaceReducer(createReducer(asyncReducers));
}

export default store;
