import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentWrapper from '../components/ContentWrapper';
import { setWaypoint } from '../actions/waypoints';

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    handleWaypoint: setWaypoint,
  }, dispatch);

export default connect(undefined, mapDispatchToProps)(ContentWrapper);
