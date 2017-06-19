import React from 'react';
import PropTypes from 'prop-types';

import Map from '../containers/FriendsOfParkMap';

import styles from './FriendsOfParkMap.less';

const FriendsOfParkMap = ({ name, maskPolygon, sectionId, task }) => (<div>
  <h2>{name}</h2>
  <p>Annetut yhteystiedot välitetään Turun kaupungin palautejärjestelmään.</p>
  <Map
    className={styles.map}
    layers={['Opaskartta']}
    mask={maskPolygon}
    minLat={60.1}
    minLong={21.5}
    minZoom={9}
    maxLat={61.0}
    maxLong={23.2}
    sectionId={sectionId}
    task={task}
    url="https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx"
  />
</div>);

FriendsOfParkMap.propTypes = {
  name: PropTypes.string,
  maskPolygon: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sectionId: PropTypes.number.isRequired,
  task: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string,
    }),
    id: PropTypes.number,
    order_number: PropTypes.number,
    task_type: PropTypes.string
  }).isRequired,
};

FriendsOfParkMap.defaultProps = {
  name: '',
};

export default FriendsOfParkMap;
