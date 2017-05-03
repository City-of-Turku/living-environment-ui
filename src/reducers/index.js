import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import waypointsReducer from './waypoints';

export default function createReducer(asyncReducers) {
  return combineReducers({
    formReducer,
    routing: routerReducer,
    waypoints: waypointsReducer,
    ...asyncReducers
  });
}
