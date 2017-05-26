import { formValueSelector } from 'redux-form';
import * as TaskType from '../../constants/taskTypes';

const formValue = formValueSelector('assignmentPage');

const calcAssignmentBudget = (state) => {
  const { assignment: { assignment }, budgetingMap } = state;
  if (!assignment || !budgetingMap) {
    return { spentBudget: 0, total: 0 };
  }
  const sectionsSpentBudget = {};
  const total = parseFloat(assignment.budget);
  const budgetingMapsSpentBudget = Object.keys(budgetingMap.tasks).reduce(
    (acc, taskId) => (budgetingMap.tasks[taskId].targetUserData || []).reduce(
      (accPerTask, target) => accPerTask + (target.selectedTarget ? parseFloat(target.selectedTarget.unit_price) : 0),
      acc),
    0);
  const budgetingTextSpentBudget = (assignment.sections || []).reduce(
    (acc, section) => (section.tasks || []).reduce(
      (accSection, task) => {
        if (task.task_type === TaskType.BudgetingTask) {
          const taskData = (task.data || {});
          if (taskData.budgeting_type === TaskType.BudgetingTextTask) {
            const sectionSpentBudget = accSection + (taskData.targets || []).reduce(
                (accTarget, target) => {
                  const targetAmount = formValue(state, `budgeting_text_task_${task.id}_${target.id}`);
                  if (!isNaN(targetAmount)) {
                    return accTarget + (parseFloat(target.unit_price) * parseFloat(targetAmount));
                  }
                  return accTarget;
                },
                accSection);
            sectionsSpentBudget[section.id] = sectionSpentBudget;
            return sectionSpentBudget;
          }
        }
        return accSection;
      }, acc),
    0);
  return { spent: budgetingMapsSpentBudget + budgetingTextSpentBudget, total, sectionsSpentBudget };
};

export default calcAssignmentBudget;
