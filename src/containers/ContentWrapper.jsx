import { connect } from 'react-redux';

import ContentWrapper from '../components/ContentWrapper';
import { setWaypoint } from '../actions/waypoints';

const mapDispatchToProps = dispatch => ({
  handleWaypoint: (id) => {
    dispatch(setWaypoint(id));
  },
});

export default connect(undefined, mapDispatchToProps)(ContentWrapper);
