import uuidV4 from 'uuid/v4';

import { friendsOfParkMapActionType } from '../constants/actionTypes';

export const friendsOfParkMapClicked = (lat, lng, taskId) => ({
  type: friendsOfParkMapActionType.ADD_UNINITIALIZED_FRIEND,
  payload: { id: uuidV4(), lat, lng, taskId, details: null, valid: false }
});

export const addFriend = friendDetails => ({
  type: friendsOfParkMapActionType.ADD_FRIEND,
  payload: friendDetails,
});

export const deleteFriend = friendId => ({
  type: friendsOfParkMapActionType.DELETE_FRIEND,
  payload: friendId,
});

export const updateFriend = (friendId, friendDetails) => ({
  type: friendsOfParkMapActionType.UPDATE_FRIEND,
  payload: {
    friendId,
    details: friendDetails,
  },
});

export const cleanInvalidFriends = () => ({
  type: friendsOfParkMapActionType.CLEAN_INVALID_FRIENDS,
});
