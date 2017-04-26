import React from 'react';
import PropType from 'prop-types';
import { Row, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';

import styles from './Header.less';

const calcPercent = (current, total) => 100 * (current / total);

const Header = ({ current, total }) => (
  <Row className={styles.root}>
    <div className={styles.label}>Assignment Name</div>
    <div className={styles.progressBarWrapper}>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="progress" className="success">
            {`${current}/${total}`}
          </Tooltip>
        }
      >
        <ProgressBar now={calcPercent(current, total)} bsStyle="success" />
      </OverlayTrigger>
    </div>
  </Row>);

Header.propTypes = {
  current: PropType.number.isRequired,
  total: PropType.number.isRequired,
};

export default Header;
