import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import RoutePattern from 'route-pattern';

import { updateFilter } from '../actions/report';
import ReportPage from '../components/ReportPage';

const formValue = formValueSelector('filter');

const getSlug = () => {
  const pathname = location.pathname;
  const reportPatternUrl = '/report/:assignmentSlug';
  const reportPattern = RoutePattern.fromString(reportPatternUrl);
  const { namedParams: { assignmentSlug } } = reportPattern.match(pathname);
  return assignmentSlug;
};

const mapStateToProps = state => ({
  report: state.report,
  selectedSchool: formValue(state, 'school'),
  selectedSchoolClass: formValue(state, 'schoolClass'),
  assignmentId: getSlug(),
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  return {
    ...stateProps,
    ...ownProps,
    updateFilter: () => dispatch(
      updateFilter(stateProps.assignmentId, stateProps.selectedSchool, stateProps.selectedSchoolClass)),
  };
}

export default connect(mapStateToProps, undefined, mergeProps)(ReportPage);
