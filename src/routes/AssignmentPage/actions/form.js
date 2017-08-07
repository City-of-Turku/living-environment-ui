import { scroller } from 'react-scroll';
import assignmentService from '../../../services/assignmentService';
import { formActionType } from '../constants/actionTypes';
import selector from '../../../utils/selector';
import { waypointsActionType } from '../../../constants/actionTypes';

export const getSectionNameByFirstError = (errors) => {
  const fieldName = Object.keys(errors)[0];
  const fieldElement = document.getElementsByName(fieldName)[0];
  const section = selector.findParentBySelector(fieldElement, 'div[role="section"]');
  return section.getAttribute('name');
};

export const submitForm = (assignmentSlug, values, schools) => ({
  type: formActionType.SUBMIT_FORM,
  payload: assignmentService.postAssignment(assignmentSlug, values, schools),
});

export const scrollToTop = () => ({
  type: formActionType.SCROLL_TO_TOP,
  payload: window.scrollTo(0, 0),
});

export const scrollToFirstErrorSection = (errors) => {
  const section = getSectionNameByFirstError(errors);
  scroller.scrollTo(section);
  return {
    type: waypointsActionType.SET_WAYPOINT,
    payload: section,
  };
};

export const disableSubmitButton = () => ({
  type: formActionType.DISABLE_SUBMIT_BUTTON,
});

export const enableSubmitButton = () => ({
  type: formActionType.ENABLE_SUBMIT_BUTTON,
});

export default submitForm;
