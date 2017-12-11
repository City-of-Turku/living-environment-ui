import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { showAlert } from "../../../actions/alerts";
import AssignmentPage from '../components/AssignmentPage';
import { submitForm, scrollToFirstErrorSection } from '../actions/form';
import validate from '../validation';
import calcAssignmentBudget from '../../../components/helpers/budgetingHelper';

const setFromValues = (values, budgetingMap, friendsOfPark) => {
  const formData = { ...values, budgeting_targets: [], friendsOfPark: friendsOfPark.filter(item => item.valid) };
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
  return formData;
};


const mapStateToProps = state => ({
  assignment: state.assignment.assignment,
  budgetingMap: state.budgetingMap, // used by mergeProps
  budget: state.assignment ? calcAssignmentBudget(state) : {},
  friendsOfPark: state.friendsOfParkMap ? state.friendsOfParkMap.friends : [],
  schools: state.assignment.assignment ? state.assignment.assignment.schools : {},
  submitButtonEnabled: state.assignmentForm.enabled,
});


function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    onSubmit: values => dispatch(
      submitForm(
        ownProps.params.assignmentSlug,
        setFromValues(values, stateProps.budgetingMap, stateProps.friendsOfPark),
        stateProps.schools)),
  };
}


export default connect(mapStateToProps, null, mergeProps)(reduxForm({
  form: 'assignmentPage',
  onSubmitFail: (errors, dispatch, submitError) => {
    if (errors !== undefined) {
      dispatch(showAlert(
        'Tarkista tiedot',
        'Tarkista, että kaikki vaaditut tiedot on täytetty.',
        'danger',
      ));    
      dispatch(scrollToFirstErrorSection(errors));
    }
  },
  validate,
})(AssignmentPage));
