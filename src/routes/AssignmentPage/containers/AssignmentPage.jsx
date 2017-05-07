import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import AssignmentPage from '../components/AssignmentPage';
import { submitForm } from '../actions/form';

const mapStateToProps = state => ({
  assignment: state.assignmentReducer.assignment,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    onSubmit: submitForm,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'assignmentPage',
})(AssignmentPage));
