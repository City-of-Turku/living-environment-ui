import { connect } from 'react-redux';

import SideBar from '../components/SideBar';

const mapStateToProps = state => ({
  currentSection: state.waypoints.currentSection,
  assignment: state.assignment.assignment,
});

export default connect(mapStateToProps)(SideBar);
