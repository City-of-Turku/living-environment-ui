import { formActionType } from '../constants/actionTypes';

const initialState = { enabled: true };

const assignmentFormReducer = (state = initialState, action) => {
  switch (action.type) {
  case formActionType.DISABLE_SUBMIT_BUTTON:
    return { enabled: false };
  case formActionType.ENABLE_SUBMIT_BUTTON:
    return { enabled: true };
  default:
    return state;
  }
};

export default assignmentFormReducer;
