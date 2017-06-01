import { friendsOfParkMapActionType } from '../constants/actionTypes';

const initialState = { friends: [] };

const friendsOfParkMapReducer = (state = initialState, action) => {
  switch (action.type) {

  case friendsOfParkMapActionType.ADD_UNINITIALIZED_FRIEND: {
    return {
      friends: [
        ...state.friends,
        action.payload,
      ],
    };
  }

  case friendsOfParkMapActionType.ADD_FRIEND: {
    const details = action.payload;
    const friend = { ...state.friends.slice(-1)[0], details, valid: true };
    return {
      friends: [
        ...state.friends.slice(0, state.friends.length - 1),
        friend,
      ]
    };
  }

  case friendsOfParkMapActionType.CLEAN_INVALID_FRIENDS: {
    return {
      friends: state.friends.filter(friendIter => friendIter.valid),
    };
  }

  case friendsOfParkMapActionType.DELETE_FRIEND: {
    const friendId = action.payload;
    return {
      friends: state.friends.filter(friendIter => friendIter.id !== friendId),
    };
  }

  case friendsOfParkMapActionType.UPDATE_FRIEND: {
    const { friendId, details } = action.payload;
    const friendIndex = state.friends.findIndex(friendIter => friendIter.id === friendId);
    return {
      friends: [
        ...state.friends.slice(0, friendIndex),
        { ...state.friends[friendIndex], details },
        ...state.friends.slice(friendIndex + 1),
      ]
    };
  }

  default:
    return state;
  }
};

export default friendsOfParkMapReducer;
