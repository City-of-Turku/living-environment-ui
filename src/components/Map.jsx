import React from 'react';
import PropTypes from 'prop-types';

import { Map as LeafletMap, WMSTileLayer } from 'react-leaflet';

/**
 * Leaflet map
 *
 * @param height - map container height
 * @param layers - list of layers
 * @param position - initial position [lat, long]
 * @param url - provider url
 * @param zoom - initial zoom [2..21]
 * @returns map element
 *
 * Example:
 * <Map
 *   position={[60.4629060928519,22.259694757206415]}
 *   zoom={12}
 *   height={400}
 *   layers={['Opaskartta']}
 *   url="https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx"
 * />
 *
 */

const Map = ({height, layers, position, url, zoom}) => {
  return (
    <LeafletMap center={position} zoom={zoom} style={{height: height}}>
      <WMSTileLayer
        layers={layers}
        url={url}
      />
    </LeafletMap>
  );
};

Map.propTypes = {
  height: PropTypes.number,
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  url: PropTypes.string.isRequired,
  zoom: PropTypes.number,
};

Map.defaultProps = {
  height: 100,
  zoom: 17
};

export default Map;
