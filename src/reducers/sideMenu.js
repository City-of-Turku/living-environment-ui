import { sideMenuActionType } from '../constants/actionTypes';

const initialState = { isShown: false };

const sideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
  case sideMenuActionType.TOGGLE_MENU:
    return { isShown: !state.isShown };
  default:
    return state;
  }
};

export default sideMenuReducer;
