import { alertsActionType } from '../constants/actionTypes';

const initialState = { text: '', type: '', shown: false };

const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
  case alertsActionType.SHOW_ALERT: {
    const { text, details, type } = action.payload;
    return { text, details, type, shown: true };
  }
  case alertsActionType.HIDE_ALERT:
    return { ...state, shown: false };
  default:
    return state;
  }
};

export default alertsReducer;
