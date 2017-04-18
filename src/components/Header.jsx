import React from 'react';
import { Col, Row, Grid, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';

import styles from './Header.less';

const Header = ({current, total}) => (
  <Row className={styles.root}>
    <div className={styles.label}>Assignment Name</div>
    <div className={styles.progressBarWrapper}>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="progress" className="success">
            {`${current}/${total}`}
          </Tooltip>
        }>
        <ProgressBar now={100 * current / total} bsStyle="success"/>
      </OverlayTrigger>
    </div>
  </Row>);

export default Header;
