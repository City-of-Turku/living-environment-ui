import { sideMenuActionType } from '../constants/actionTypes';

export const toggleMenu = () => ({
  type: sideMenuActionType.TOGGLE_MENU,
});

export const hideMenu = () => ({
  type: sideMenuActionType.HIDE_MENU,
});

export default toggleMenu;
