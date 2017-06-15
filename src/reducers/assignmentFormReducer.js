import { reducer as formReducer } from 'redux-form';

import * as assignmentActionType from '../routes/AssignmentPage/constants/actionTypes/assignment';
import * as TaskType from '../constants/taskTypes/index';

const calculateFormInitialValues = (assignment) => {
  const formInitialValues = {};
  ((assignment || {}).sections || []).forEach((section) => {
    (section.tasks || []).forEach((task) => {
      if (task.task_type === TaskType.BudgetingTask && task.data.budgeting_type === TaskType.BudgetingTextTask) {
        (task.data.targets || []).forEach((target) => {
          const name = `budgeting_text_task_${task.id}_${target.id}`;
          formInitialValues[name] = target.reference_amount;
        });
      }
    });
  });
  return formInitialValues;
};

const assignmentFormReducer = {
  form: formReducer.plugin({
    assignmentPage: (state, action) => {
      switch (action.type) {
      case assignmentActionType.FETCH_ASSIGNMENT_FULFILLED: {
        const assignment = action.payload;
        const initialValues = calculateFormInitialValues(assignment);
        return {
          ...state,
          values: {
            ...state.values,
            ...initialValues,
          },
          fields: {
            ...state.fields,
          }
        };
      }
      default:
        return state;
      }
    }
  })
};

export default assignmentFormReducer;
