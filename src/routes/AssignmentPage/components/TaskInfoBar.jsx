import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import currencyFormatter from 'currency-formatter';

import styles from './TaskInfoBar.less';

const TaskInfoBar = ({ tasksCount, totalBudget }) => (
  <div className={styles.root}>
    <Row>
      <Col sm={6} className={classNames(styles.col, styles.firstCol)}>
        <div>Budjetti</div>
        <div className={styles.value}>
          <strong>{currencyFormatter.format(totalBudget, { locale: 'fi-FI' })}</strong>
        </div>
      </Col>
      <Col sm={6} className={styles.col}>
        <div>Tehtävien määrä</div>
        <div className={styles.value}>
          <strong>{tasksCount}</strong>
        </div>
      </Col>
    </Row>
  </div>
);

TaskInfoBar.propTypes = {
  tasksCount: PropTypes.number.isRequired,
  totalBudget: PropTypes.string.isRequired,
};

export default TaskInfoBar;
