import { sideMenuActionType } from '../constants/actionTypes';

const initialState = { isShown: false };

const sideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
  case sideMenuActionType.TOGGLE_MENU:
    return { isShown: !state.isShown };
  case sideMenuActionType.HIDE_MENU:
    return { isShown: false };
  default:
    return state;
  }
};

export default sideMenuReducer;
