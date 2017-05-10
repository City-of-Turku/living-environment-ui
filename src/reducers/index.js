import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import sideMenuReducer from './sideMenu';
import waypointsReducer from './waypoints';

export default function createReducer(asyncReducers) {
  return combineReducers({
    form: formReducer,
    routing: routerReducer,
    sideMenu: sideMenuReducer,
    waypoints: waypointsReducer,
    ...asyncReducers
  });
}
