import {reset} from 'redux-form';
import { put, takeEvery } from 'redux-saga/effects';

import { formActionType } from '../routes/AssignmentPage/constants/actionTypes';
import { disableSubmitButton, enableSubmitButton } from '../routes/AssignmentPage/actions/form';
import { showAlert } from "../actions/alerts";

function* handleFormSubmition(action) {
  switch (action.type) {
  case formActionType.SUBMIT_FORM:
    yield put(disableSubmitButton());
    break;
  case formActionType.SUBMIT_FORM_FULFILLED:
    yield put(showAlert('Tiedot lähetetty', 'Olet lähettänyt tiedot onnistuneesti. Kiitos ajastasi.', 'success'));
    yield put(enableSubmitButton());
    yield put(reset('assignmentPage'));
    break;
  case formActionType.SUBMIT_FORM_REJECTED:
    yield put(showAlert('Lähetys epäonnistui', 'Jokin meni pahasti pieleen :( Yritä myöhemmin uudelleen.', 'danger'));
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
