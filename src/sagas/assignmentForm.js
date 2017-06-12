import { put, takeEvery } from 'redux-saga/effects';

import { formActionType } from '../routes/AssignmentPage/constants/actionTypes';
import { showAlert } from "../actions/alerts";

function* handleFormSubmition(action) {
  switch (action.type) {
  case formActionType.SUBMIT_FORM_FULFILLED:
    yield put(showAlert('Form sent', 'You have successfully lorem ipsumed', 'success'));
    break;
  case formActionType.SUBMIT_FORM_REJECTED:
    yield put(showAlert('Sent failed', 'Something went terribly wrong!', 'danger'));
    break;
  default:
  }
}

function* assignmentForm() {
  yield takeEvery([formActionType.SUBMIT_FORM_FULFILLED, formActionType.SUBMIT_FORM_REJECTED], handleFormSubmition);
}

export default assignmentForm;
