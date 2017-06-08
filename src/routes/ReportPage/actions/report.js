import reportService from '../../../services/reportService';
import { reportActionType } from '../constants/actionTypes';

export const fetchReport = assignmentId => ({ // eslint-disable-line import/prefer-default-export
  type: reportActionType.FETCH_REPORT,
  payload: reportService.fetchReport(assignmentId),
});

export const updateFilter = (assignmentId, school, schoolClass) => ({
  type: reportActionType.FETCH_REPORT,
  payload: reportService.fetchReport(assignmentId, school, schoolClass),
});
