import React from 'react';
import PropTypes from 'prop-types';

import Map from '../containers/Map';

import styles from './BudgetingMapTask.less';

const BudgetingMapTask = ({ className, maskPolygon, sectionId, task }) => (
  <div className={className}>
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
      sectionId={sectionId}
      task={task}
      url="https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx"
    />
  </div>);

BudgetingMapTask.propTypes = {
  className: PropTypes.string,
  maskPolygon: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  sectionId: PropTypes.number.isRequired,
  task: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

BudgetingMapTask.defaultProps = {
  className: '',
};


export default BudgetingMapTask;
