import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import AssignmentPage from '../components/AssignmentPage';

const mapStateToProps = state => ({
  assignment: state.assignmentReducer.assignment,
});

export default connect(mapStateToProps)(reduxForm({ form: 'assignmentPage' })(AssignmentPage));
