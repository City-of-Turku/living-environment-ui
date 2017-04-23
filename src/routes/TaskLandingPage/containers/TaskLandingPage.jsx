import { connect } from 'react-redux';

import TaskLandingPage from '../components/TaskLandingPage';

const mapStateToProps = state => ({
  sections: state.assignmentReducer.sections,
});

export default connect(mapStateToProps)(TaskLandingPage);
