import assignmentService from '../../../services/assignmentService';
import { assignmentActionType } from '../constants/actionTypes';

export const fetchAssignment = assignmentId => ({
  type: assignmentActionType.FETCH_ASSIGNMENT,
  payload: assignmentService.fetchAssignment(assignmentId),
});

export default fetchAssignment;
