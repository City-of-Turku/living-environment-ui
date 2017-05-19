import { polygon } from 'leaflet';
import PropTypes from 'prop-types';
import { Path } from 'react-leaflet';

class MapMask extends Path {

  // invert the polygon in order to create the mask
  //
  //            1/8         2
  //              ++++++++++
  //        7   +..........+
  //          +............+       4
  //          +............++++++++
  //          +..........3........+
  //          +...................+
  //          +++++++++++++++++++++
  //        6                      5
  //
  //    2/6                                        3
  //    ++++++++++++++++++++++++++++++++++++++++++
  //    + ++.....................................+
  //    +...+....................................+
  //    +....++..................................+
  //    +......+.................................+
  //    +.......++.1/7/13....8...................+
  //    +..........++++++++++....................+
  //    +...12...+          +....................+
  //    +......+            +.......9............+
  //    +......+            ++++++++.............+
  //    +......+          9        +.............+
  //    +......+                   +.............+
  //    +......+++++++++++++++++++++.............+
  //    +....11.....................10...........+
  //    +........................................+
  //    +........................................+
  //    ++++++++++++++++++++++++++++++++++++++++++
  //    5                                         4
  //

  invertPolygon(positions) {
    const { minLat, minLong, maxLat, maxLong, boundaryOffset } = this.props;
    return [
      positions[0],
      [minLat - boundaryOffset, minLong - boundaryOffset],
      [maxLat + boundaryOffset, minLong - boundaryOffset],
      [maxLat + boundaryOffset, maxLong + boundaryOffset],
      [minLat - boundaryOffset, maxLong + boundaryOffset],
      [minLat - boundaryOffset, minLong - boundaryOffset],
      ...positions];
  }

  createLeafletElement(props) {
    const { positions, ...options } = props;
    return polygon(this.invertPolygon(positions), this.getOptions(options));
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.positions !== fromProps.positions) {
      const invertedPolygon = this.invertPolygon(toProps.positions);
      this.leafletElement.setLatLngs(invertedPolygon);
    }
    this.setStyleIfChanged(fromProps, toProps);
  }
}

MapMask.propTypes = {
  boundaryOffset: PropTypes.number,
  minLat: PropTypes.number.isRequired,
  minLong: PropTypes.number.isRequired,
  maxLat: PropTypes.number.isRequired,
  maxLong: PropTypes.number.isRequired,
  positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

MapMask.defaultProps = {
  boundaryOffset: 5,
};

export default MapMask;
