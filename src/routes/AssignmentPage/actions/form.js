import assignmentService from '../../../services/assignmentService';
import { formActionType } from '../constants/actionTypes';

export const submitForm = (assignmentSlug, values) => ({
  type: formActionType.SUBMIT_FORM,
  payload: assignmentService.postAssignment(assignmentSlug, values),
});

export default submitForm;
