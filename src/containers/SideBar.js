import { connect } from 'react-redux';

import SideBar from '../components/SideBar';
import calcAssignmentBudget from '../components/helpers/budgetingHelper';

const mapStateToProps = state => ({
  currentSection: state.waypoints.currentSection,
  assignment: state.assignment.assignment,
  budget: calcAssignmentBudget(state),
});

export default connect(mapStateToProps)(SideBar);
