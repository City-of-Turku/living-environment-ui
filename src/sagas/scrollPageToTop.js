import { takeEvery } from 'redux-saga/effects';

import { sideMenuActionType } from '../constants/actionTypes';

function handleScrollPageToTop() {
  window.scroll(0, 0);
}

function* scrollPageToTop() {
  yield takeEvery(sideMenuActionType.SCROLL_PAGE_TO_TOP, handleScrollPageToTop);
}

export default scrollPageToTop;
