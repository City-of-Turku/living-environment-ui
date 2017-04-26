import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import TaskLandingPage from '../components/TaskLandingPage';

const mapStateToProps = state => ({
  sections: state.assignmentReducer.sections,
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'landingPage'
  })(TaskLandingPage));
