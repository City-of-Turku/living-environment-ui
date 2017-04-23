import { assignmentActionType } from '../constants/actionTypes';

const initialState = { sections: [] };

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
  case assignmentActionType.FETCH_ASSIGNMENT_FULFILLED:
    return { sections: action.payload };
  case assignmentActionType.FETCH_ASSIGNMENT_REJECTED:
    return { error: action.payload };
  default:
    return state;
  }
};

export default assignmentReducer;
