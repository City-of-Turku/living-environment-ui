import { waypointsActionType } from '../constants/actionTypes';

const initialState = { currentSection: '' };

const waypointsReducer = (state = initialState, action) => {
  switch (action.type) {
  case waypointsActionType.SET_WAYPOINT:
    return { currentSection: action.payload };
  default:
    return state;
  }
};

export default waypointsReducer;
