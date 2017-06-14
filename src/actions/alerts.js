import { alertsActionType } from '../constants/actionTypes';

export const showAlert = (text, details, type = 'info') => ({
  type: alertsActionType.SHOW_ALERT,
  payload: { text, details, type },
});

export const hideAlert = () => ({
  type: alertsActionType.HIDE_ALERT,
});
