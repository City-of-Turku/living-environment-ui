import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';


import BudgetingTextTask from '../components/BudgetingTextTask';

const fieldToNumber = value => parseFloat(value || 0);

const formValue = formValueSelector('assignmentPage');

const getTargetById = (data, targetId) => data.targets.find(target => target.id === targetId);

const getProgress = (targetValuesMap, data) => {
  const amountOfConsumption = data.amount_of_consumption;
  const total = fieldToNumber(amountOfConsumption);
  if (total > 0) {
    const current = Object.keys(targetValuesMap).reduce(
      (acc, targetId) => {
        const target = getTargetById(data, parseInt(targetId, 10));
        const value = fieldToNumber(targetValuesMap[targetId]);
        if (!target || (target.min_amount > value) || (target.max_amount && target.max_amount < value)) {
          return acc;
        }
        return acc + value;
      }, 0);
    return {
      value: 100 * (current / total),
      label: `${current} / ${total}`,
      completed: current === total,
    };
  }
  return { value: 0, label: '-- / --', completed: false };
};

const getTargetValuesMap = (state, ownProps) => ownProps.task.data.targets.reduce((acc, target) => {
  acc[target.id] = formValue(state, `budgeting_text_task_${ownProps.task.id}_${target.id}`);
  return acc;
}, {});

const mapStateToProps = (state, ownProps) => ({
  progress: getProgress(getTargetValuesMap(state, ownProps), ownProps.task.data),
  targetValuesMap: getTargetValuesMap(state, ownProps),
});

export default connect(mapStateToProps)(BudgetingTextTask);
