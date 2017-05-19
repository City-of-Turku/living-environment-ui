import React from 'react';
import PropTypes from 'prop-types';

import Map from '../../../components/Map';

import styles from './BudgetingMapTask.less';

const BudgetingMapTask = ({ classnName, maskPolygon, task }) => (<div className={classnName}>
  <h4>{task.name}</h4>
  <Map
    className={styles.map}
    layers={['Opaskartta']}
    mask={maskPolygon}
    minLat={60.1}
    minLong={21.5}
    minZoom={9}
    maxLat={61.0}
    maxLong={23.2}
    url="https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx"
  />
</div>);

BudgetingMapTask.propTypes = {
  classnName: PropTypes.string,
  maskPolygon: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  task: PropTypes.shape({
    id: PropTypes.number,
    data: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      targets: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        icon: PropTypes.string,
      })),
    }),
  }).isRequired,
};

BudgetingMapTask.defaultProps = {
  classnName: '',
};


export default BudgetingMapTask;
