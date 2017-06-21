import { formValueSelector } from 'redux-form';
import * as TaskType from '../../constants/taskTypes';

const formValue = formValueSelector('assignmentPage');

const toFloat = value => parseFloat((value || '').toString().replace(',', '.'));

const calcTextTaskSpentBudget = (task, state) => {
  const taskData = (task.data || {});
  const textTaskSpentBudget = (taskData.targets || []).reduce(
      (accTarget, target) => {
        const targetAmount = toFloat(formValue(state, `budgeting_text_task_${task.id}_${target.id}`));
        if (!isNaN(targetAmount)) {
          const value = parseFloat(targetAmount);
          if (value < target.min_amount || (target.max_amount && value > target.max_amount)) {
            return accTarget;
          }
          return accTarget + (parseFloat(target.unit_price) * value);
        }
        return accTarget;
      }, 0);
  return textTaskSpentBudget;
};

const calcSectionSpentBudget = (section, state) => (section.tasks || []).reduce(
    (accSection, task) => {
      if (task.task_type === TaskType.BudgetingTask) {
        const taskData = (task.data || {});
        if (taskData.budgeting_type === TaskType.BudgetingTextTask) {
          return accSection + calcTextTaskSpentBudget(task, state);
        }
      }
      return accSection;
    }, 0);

const calcMapSpentBudget = task => (task.targetUserData || []).reduce((acc, target) => {
  if (target.selectedTarget) {
    return acc + parseFloat(target.selectedTarget.unit_price);
  }
  return acc;
}, 0);

const calcAssignmentBudget = (state) => {
  const { assignment: { assignment }, budgetingMap } = state;
  if (!assignment || !budgetingMap) {
    return { spentBudget: 0, total: 0 };
  }

  const spentBudget = (assignment.sections || []).reduce(
    (acc, section) => {
      const sectionSpentBudget = calcSectionSpentBudget(section, state);
      acc.spent += sectionSpentBudget;
      acc.sectionsSpentBudget[section.id] = sectionSpentBudget;
      return acc;
    }, { spent: 0, sectionsSpentBudget: {} });

  return Object.keys(budgetingMap.tasks).reduce(
    (accSpentBudget, taskId) => {
      const task = budgetingMap.tasks[taskId];
      const mapSpentBudget = calcMapSpentBudget(task);
      /* eslint-disable */
      accSpentBudget.spent += mapSpentBudget;
      accSpentBudget.sectionsSpentBudget[task.sectionId] += mapSpentBudget;
      /* eslint-enable */
      return accSpentBudget;
    }, spentBudget);
};

export default calcAssignmentBudget;
