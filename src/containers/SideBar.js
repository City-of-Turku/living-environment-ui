import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SideBar from '../components/SideBar';
import calcAssignmentBudget from '../components/helpers/budgetingHelper';

import { hideMenu, scrollPageToTop } from '../actions/sideMenu';

const mapStateToProps = state => ({
  currentSection: state.waypoints.currentSection,
  assignment: state.assignment ? state.assignment.assignment : {},
  budget: state.assignment ? calcAssignmentBudget(state) : {},
  reportName: state.report ? state.report.name : '',
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({
    hideMenu,
    scrollPageToTop,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
