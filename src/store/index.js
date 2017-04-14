import { applyMiddleware, compose, createStore,  } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';

import reducers from '../reducers';

const middleware = [
  logger,
];


let composeEnhancers = process.env.NODE_ENV === 'development' ?
  composeWithDevTools({}) :
  compose;

const store = createStore(
  reducers,
  composeEnhancers( applyMiddleware(...middleware))
);

export default store;
