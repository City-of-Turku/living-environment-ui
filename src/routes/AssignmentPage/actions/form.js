import assignmentService from '../../../services/assignmentService';
import { formActionType } from '../constants/actionTypes';

export const submitForm = (assignmentSlug, values, schools) => ({
  type: formActionType.SUBMIT_FORM,
  payload: assignmentService.postAssignment(assignmentSlug, values, schools),
});

export const disableSubmitButton = () => ({
  type: formActionType.DISABLE_SUBMIT_BUTTON,
});

export const enableSubmitButton = () => ({
  type: formActionType.ENABLE_SUBMIT_BUTTON,
});

export default submitForm;
