import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AssignmentPage from '../components/AssignmentPage';
import { submitForm } from '../actions/form';
import validate from '../validation';

const setFromValues = (values, budgetingMap) => {
  const formData = { ...values, budgeting_targets: [] };
  Object.keys(budgetingMap.tasks).forEach((taskId) => {
    const task = budgetingMap.tasks[taskId];
    task.targetUserData.forEach((target) => {
      if (target.valid) {
        formData.budgeting_targets.push({
          task: taskId,
          target: target.selectedTarget.id,
          amount: target.selectedTarget.reference_amount,
          point: [target.lat, target.lng],
        });
      }
    });
  });
};

const mapStateToProps = state => ({
  assignment: state.assignment.assignment,
  budgetingMap: state.budgetingMap, // used by mergeProps
});


function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    onSubmit: values => dispatch(
      submitForm(ownProps.params.assignmentSlug, setFromValues(values, stateProps.budgetingMap))),
  };
}


export default connect(mapStateToProps, null, mergeProps)(reduxForm({
  form: 'assignmentPage',
  validate,
})(AssignmentPage));
