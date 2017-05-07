import assignmentService from '../../../services/assignmentService';
import { formActionType } from '../constants/actionTypes';

export const submitForm = values => ({
  type: formActionType.SUBMIT_FORM,
  payload: assignmentService.postAssignment(values),
});

export default submitForm;
