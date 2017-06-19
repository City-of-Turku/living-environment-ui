import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import currencyFormatter from 'currency-formatter';

import styles from './TaskInfoBar.less';

const TaskInfoBar = ({ tasksCount, totalBudget }) => (
  <div className={styles.root}>
    <Row>
      <Col xs={12} sm={6} className={classNames(styles.col, styles.firstCol)}>
        <div>Budjetti</div>
        <div className={styles.value}>{currencyFormatter.format(totalBudget, { locale: 'fi-FI' })}</div>
      </Col>
      <Col xs={12} sm={6} className={styles.col}>
        <div>Tehtävien määrä</div>
        <div className={styles.value}>{tasksCount}</div>
      </Col>
    </Row>
  </div>);

TaskInfoBar.propTypes = {
  tasksCount: PropTypes.number.isRequired,
  totalBudget: PropTypes.string.isRequired,
};

export default TaskInfoBar;
