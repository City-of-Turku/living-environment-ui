import { connect } from 'react-redux';

import Map from '../../../components/Map';

const mapStateToProps = (state, ownProps) => ({
  maskPolygon: ownProps.maskPolygon,
});

export default connect(mapStateToProps)(Map);
