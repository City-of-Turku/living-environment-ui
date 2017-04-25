import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import waypointsReducer from './waypoints';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    formReducer,
    waypoints: waypointsReducer,
    ...asyncReducers
  });
}
