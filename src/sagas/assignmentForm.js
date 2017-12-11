import { reset } from 'redux-form';
import { put, takeEvery } from 'redux-saga/effects';

import { formActionType } from '../routes/AssignmentPage/constants/actionTypes';
import { disableSubmitButton, enableSubmitButton, scrollToTop } from '../routes/AssignmentPage/actions/form';
import { cleanInvalidFriends } from '../routes/AssignmentPage/actions/friendsOfParkMap';
import { showAlert } from "../actions/alerts";

function* handleFormSubmition(action) {
  let details;
  switch (action.type) {
  case formActionType.SUBMIT_FORM:
    yield put(cleanInvalidFriends());
    yield put(disableSubmitButton());
    break;
  case formActionType.SUBMIT_FORM_FULFILLED:
    details = 'Olet lähettänyt tiedot onnistuneesti. Kiitos ajastasi.'
    if (action.payload.feedback_system_success){
      details += '\n\n' + action.payload.feedback_system_success;
    }
    yield put(showAlert('Tiedot lähetetty', details, 'success'));
    yield put(enableSubmitButton());
    yield put(reset('assignmentPage'));
    yield put(scrollToTop());
    break;
  case formActionType.SUBMIT_FORM_REJECTED:
    details = 'Jokin meni pahasti pieleen :( Yritä myöhemmin uudelleen.'; 
    if (action.payload.response !== undefined) {
      details += '\n\n' + action.payload.response.data.detail;
    }
    yield put(showAlert('Lähetys epäonnistui', details, 'danger'));
    yield put(enableSubmitButton());
    break;
  default:
  }
}

function* assignmentForm() {
  yield takeEvery([
    formActionType.SUBMIT_FORM,
    formActionType.SUBMIT_FORM_FULFILLED,
    formActionType.SUBMIT_FORM_REJECTED], handleFormSubmition);
}

export default assignmentForm;
