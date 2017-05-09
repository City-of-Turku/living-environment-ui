import { assignmentActionType } from '../constants/actionTypes';

const initialState = { assignment: null };

const assignmentReducer = (state = initialState, action) => {
  switch (action.type) {
  case assignmentActionType.FETCH_ASSIGNMENT_FULFILLED:
    return { assignment: action.payload };
  case assignmentActionType.FETCH_ASSIGNMENT_REJECTED:
    return { error: action.payload };
  default:
    return state;
  }
};

export default assignmentReducer;
