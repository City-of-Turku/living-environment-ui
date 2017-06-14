import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import alerts from './alerts';
import sideMenuReducer from './sideMenu';
import waypointsReducer from './waypoints';

export default function createReducer(asyncReducers) {
  return combineReducers({
    alerts,
    form: formReducer,
    routing: routerReducer,
    sideMenu: sideMenuReducer,
    waypoints: waypointsReducer,
    ...asyncReducers
  });
}
