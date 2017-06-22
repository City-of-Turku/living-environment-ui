import { sideMenuActionType } from '../constants/actionTypes';

export const toggleMenu = () => ({
  type: sideMenuActionType.TOGGLE_MENU,
});

export const hideMenu = () => ({
  type: sideMenuActionType.HIDE_MENU,
});

export const scrollPageToTop = () => ({
  type: sideMenuActionType.SCROLL_PAGE_TO_TOP,
});

export default toggleMenu;
