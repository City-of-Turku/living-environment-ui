import { connect } from 'react-redux';

import SideBar from '../components/SideBar';

const mapStateToProps = state => ({
  currentSection: state.waypoints.currentSection,
});

export default connect(mapStateToProps)(SideBar);
