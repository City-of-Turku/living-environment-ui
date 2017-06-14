import { connect } from 'react-redux';

import Alerts from '../components/Alerts';

const mapStateToProps = state => ({
  text: state.alerts.text,
  details: state.alerts.details,
  type: state.alerts.type,
  shown: state.alerts.shown,
});

export default connect(mapStateToProps)(Alerts);
