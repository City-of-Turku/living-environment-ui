import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import alerts from './alerts';
import sideMenuReducer from './sideMenu';
import waypointsReducer from './waypoints';
import assignmentFromReducer from './assignmentFormReducer';

export default function createReducer(asyncReducers) {
  return combineReducers({
    alerts,
    form: assignmentFromReducer.form,
    routing: routerReducer,
    sideMenu: sideMenuReducer,
    waypoints: waypointsReducer,
    ...asyncReducers
  });
}
