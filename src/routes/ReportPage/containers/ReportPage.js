import { connect } from 'react-redux';

import ReportPage from '../components/ReportPage';

const mapStateToProps = state => ({
  report: state.report,
});

export default connect(mapStateToProps)(ReportPage);
