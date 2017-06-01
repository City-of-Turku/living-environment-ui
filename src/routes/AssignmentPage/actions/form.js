import assignmentService from '../../../services/assignmentService';
import { formActionType } from '../constants/actionTypes';

export const submitForm = (assignmentSlug, values, schools) => ({
  type: formActionType.SUBMIT_FORM,
  payload: assignmentService.postAssignment(assignmentSlug, values, schools),
});

export default submitForm;
