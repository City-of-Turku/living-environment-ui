import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import waypointsReducer from './waypoints';

export default function createReducer(asyncReducers) {
  return combineReducers({
    routing: routerReducer,
    waypoints: waypointsReducer,
    ...asyncReducers
  });
}
