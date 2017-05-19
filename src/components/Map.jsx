import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, Marker, Polygon, Popup, WMSTileLayer } from 'react-leaflet';
import L from 'leaflet';
import inside from 'point-in-polygon';

import MapMask from './MapMask';

import styles from './Map.less';

class Map extends Component {
  handleClick(e) {
    const point = e.latlng;
    const { mask } = this.props;
    if (inside([point.lat, point.lng], mask)) {
      this.setState({ latlng: e.latlng });
    }
  }

  render() {
    const { className, layers, mask, maxLat, maxLong, minLat, minLong, minZoom, url } = this.props;
    const polygon = L.polygon(mask);
    const areaBounds = polygon.getBounds();
    const marker = this.state && this.state.latlng
      ? (<Marker position={this.state.latlng}>
        <Popup>
          <div>
            <div>Placeholder</div>
          </div>
        </Popup>
      </Marker>)
      : null;
    return (<LeafletMap
      className={className}
      bounds={areaBounds}
      maxBounds={[[minLat, minLong], [maxLat, maxLong]]}
      minZoom={minZoom}
      onClick={e => this.handleClick(e)}
    >
      <WMSTileLayer
        layers={layers}
        url={url}
      />
      <MapMask
        className={styles.mask}
        color="black"
        fillOpacity={0.4}
        minLat={minLat}
        minLong={minLong}
        maxLat={maxLat}
        maxLong={maxLong}
        positions={mask}
        weight={0}
      />
      <Polygon color="white" positions={mask} fillOpacity={0} weight={1} />
      {marker}
    </LeafletMap>);
  }
}

Map.propTypes = {
  className: PropTypes.string,
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  mask: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  maxLat: PropTypes.number.isRequired,
  maxLong: PropTypes.number.isRequired,
  minLat: PropTypes.number.isRequired,
  minLong: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};

Map.defaultProps = {
  className: '',
};

export default Map;
