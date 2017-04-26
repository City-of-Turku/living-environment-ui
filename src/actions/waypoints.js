import { waypointsActionType } from '../constants/actionTypes';

export const setWaypoint = waypointId => ({
  type: waypointsActionType.SET_WAYPOINT,
  payload: waypointId,
});

export default setWaypoint;
