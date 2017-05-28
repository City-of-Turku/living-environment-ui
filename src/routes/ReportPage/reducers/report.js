import { reportActionType } from '../constants/actionTypes';

const initialState = {};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
  case reportActionType.FETCH_REPORT_FULFILLED:
    return { report: action.payload };
  case reportActionType.FETCH_REPORT_REJECTED:
    return { error: action.payload };
  default:
    return state;
  }
};

export default reportReducer;
