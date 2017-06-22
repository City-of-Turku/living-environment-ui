import { fork } from 'redux-saga/effects';

import alerts from './alerts';
import assignmentForm from './assignmentForm';
import scrollPageToTop from './scrollPageToTop';

export default function* root() {
  yield fork(alerts);
  yield fork(assignmentForm);
  yield fork(scrollPageToTop);
}
