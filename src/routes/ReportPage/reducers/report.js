import { reportActionType } from '../constants/actionTypes';
import { assignmentActionType } from '../../AssignmentPage/constants/actionTypes';

const initialState = {};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
  case assignmentActionType.FETCH_ASSIGNMENT_FULFILLED:
    return { ...state, schools: action.payload.schools };
  case reportActionType.FETCH_REPORT_FULFILLED:
    return { schools: state.schools, ...action.payload };
  case reportActionType.FETCH_REPORT_REJECTED:
    return { error: action.payload };
  default:
    return state;
  }
};

export default reportReducer;
