import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';

import styles from './TaskInfoBar.less';

const TaskInfoBar = ({ tasks, totalBudget }) => (
  <div className={styles.root}>
    <Row>
      <Col xs={12} sm={6} className={classNames(styles.col, styles.firstCol)}>
        <div>Total Budget</div>
        <div className={styles.value}>{totalBudget}</div>
      </Col>
      <Col xs={12} sm={6} className={styles.col}>
        <div>Tasks Completed</div>
        <div className={styles.value}>{tasks.completed}/{tasks.total}</div>
      </Col>
    </Row>
  </div>);

TaskInfoBar.propTypes = {
  tasks: PropTypes.shape({
    completed: PropTypes.number,
    total: PropTypes.number
  }).isRequired,
  totalBudget: PropTypes.number.isRequired,
};

export default TaskInfoBar;
