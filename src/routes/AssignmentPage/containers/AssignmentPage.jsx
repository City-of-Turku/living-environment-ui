import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AssignmentPage from '../components/AssignmentPage';
import { submitForm } from '../actions/form';
import validate from '../validation';

const mapStateToProps = state => ({
  assignment: state.assignmentReducer.assignment,
});

const mapDispatchToProps = (dispatch, ownProps) =>
  bindActionCreators({
    onSubmit: values => submitForm(ownProps.params.assignmentSlug, values),
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'assignmentPage',
  validate,
})(AssignmentPage));
