import reportService from '../../../services/reportService';
import { reportActionType } from '../constants/actionTypes';

export const fetchReport = assignmentId => ({ // eslint-disable-line import/prefer-default-export
  type: reportActionType.FETCH_REPORT,
  payload: reportService.fetchReport(assignmentId),
});
