import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map as LeafletMap, Marker, Polygon, Popup, WMSTileLayer } from 'react-leaflet';
import L, { divIcon } from 'leaflet';
import inside from 'point-in-polygon';
import classnames from 'classnames';

import MapMask from './MapMask';
import BudgetingMapTargetList from '../components/BudgetingMapTargetList';
import config from '../config';

import styles from './Map.less';
import pin from './MapPin.svg';
import pinWHole from './MapPinHole.svg';

const iconSize = [38, 48];

class Map extends Component {

  static getMarkerIcon(target) {
    let html;
    const { backendImages: { baseUrl } } = config;
    if (target.valid && target.selectedTarget.icon) {
      if (target.selectedTarget.icon.endsWith('.svg')) {
        html = [`<div class="${classnames(styles.markerIconWrapper, styles.customSvgIcon)}"`,
          ` style="background-image: url(${baseUrl + target.selectedTarget.icon})"></div>`].join('');
      } else {
        html = [`<div class="${classnames(styles.markerIconWrapper)}" style="background-image: url(${pinWHole})">`,
          `<div class=${styles.markerIcon} style="background-image:`,
          ` url(${baseUrl + target.selectedTarget.icon})"></div>`,
          `</div>`].join('');
      }
    } else {
      html = [`<div class="${classnames(styles.markerIconWrapper)}" style="background-image: url(${pin})">`,
        `</div>`].join('');
    }
    const iconDefinition = {
      className: styles.dotIcon,
      iconAnchor: [iconSize[0] / 2, iconSize[1]],
      iconSize,
      html,
    };
    return divIcon(iconDefinition);
  }

  initPopup(ref, target) {
    if (ref) {
      if (!target.valid) {
        const position = [target.lat, target.lng];
        this.mapRef = ref.context.map;
        setTimeout(() => ref.context.map.openPopup(ref.leafletElement, position));
      }
    }
  }

  closePopup() {
    this.mapRef.closePopup();
    return true;
  }

  handleClick(e) {
    const point = e.latlng;
    const { handleMapClick, mask, readOnly, task } = this.props;
    if (inside([point.lat, point.lng], mask) && handleMapClick && !readOnly) {
      handleMapClick(e.latlng.lat, e.latlng.lng, task);
    }
  }

  render() {
    const {
      className, handleAddTarget, handleBudgetingMapTargetListDialogClosed, handleDeleteTarget,
      handleUpdateTarget, layers, mask, maxLat, maxLong, minLat, minLong, minZoom, readOnly,
      targetUserData, task, url
    } = this.props;
    const polygon = L.polygon(mask);
    const areaBounds = polygon.getBounds();

    const markers = targetUserData.map(target => (
      <Marker position={[target.lat, target.lng]} icon={Map.getMarkerIcon(target)} key={target.id}>
        {
           !readOnly && (<Popup ref={ref => this.initPopup(ref, target)} className={styles.popup}>
             <BudgetingMapTargetList
               task={task}
               selectedTarget={target.selectedTarget}
               onDelete={selectedTarget => this.closePopup() && handleDeleteTarget(target.id, selectedTarget)}
               onSave={selectedTarget => this.closePopup() && handleAddTarget(selectedTarget)}
               onUpdate={selectedTarget => this.closePopup() && handleUpdateTarget(target.id, selectedTarget)}
               onDialogClosed={() => handleBudgetingMapTargetListDialogClosed()}
             />
           </Popup>)
        }
      </Marker>));

    return (<LeafletMap
      className={className}
      bounds={areaBounds}
      maxBounds={[[minLat, minLong], [maxLat, maxLong]]}
      minZoom={minZoom}
      onClick={e => this.handleClick(e)}
      ref={(ref) => {
        this.ref = ref;
      }}
      scrollWheelZoom={false}
      targetUserData={targetUserData}
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
      {markers}
    </LeafletMap>);
  }
}

Map.propTypes = {
  className: PropTypes.string,
  handleMapClick: PropTypes.func,
  handleAddTarget: PropTypes.func,
  handleBudgetingMapTargetListDialogClosed: PropTypes.func,
  handleDeleteTarget: PropTypes.func,
  handleUpdateTarget: PropTypes.func,
  layers: PropTypes.arrayOf(PropTypes.string).isRequired,
  mask: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  maxLat: PropTypes.number.isRequired,
  maxLong: PropTypes.number.isRequired,
  minLat: PropTypes.number.isRequired,
  minLong: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  readOnly: PropTypes.bool,
  task: PropTypes.shape({}),
  targetUserData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  url: PropTypes.string.isRequired,
};

Map.defaultProps = {
  className: '',
  handleAddTarget: () => {},
  handleBudgetingMapTargetListDialogClosed: () => {},
  handleDeleteTarget: () => {},
  handleMapClick: null,
  handleUpdateTarget: () => {},
  readOnly: false,
  targets: [],
  task: null,
};

export default Map;
