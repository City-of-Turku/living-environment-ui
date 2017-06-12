import { actionChannel, call, take, put, race } from 'redux-saga/effects';
import { hideAlert } from '../actions/alerts';
import { alertsActionType } from '../constants/actionTypes';

const alertShowTimeMs = 3000;

let timerId;
const wait = () => (
  new Promise((resolve) => {
    timerId = setTimeout(() => resolve(), alertShowTimeMs);
  })
);

function* runTimer() {
  const channel = yield actionChannel(alertsActionType.SHOW_ALERT);

  while (yield take(channel)) {
    clearTimeout(timerId);
    const winner = yield race({
      retrigger: take(alertsActionType.SHOW_ALERT),
      hide: call(wait)
    });
    if (!winner.retrigger) {
      yield put(hideAlert());
    } else {
      clearTimeout(timerId);
    }
  }
}

export default runTimer;
