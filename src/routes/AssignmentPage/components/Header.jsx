import React from 'react';
import PropType from 'prop-types';
import { Row, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';

import styles from './Header.less';

const calcPercent = (moneyUsed, totalBudget) => 100 * (moneyUsed / totalBudget);

const Header = ({ moneyUsed, totalBudget }) => (
  <Row className={styles.root}>
    <div className={styles.label}>Nykyinen budjetti</div>
    <div className={styles.progressBarWrapper}>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="progress" className="success">
            {`${moneyUsed}/${totalBudget}`}
          </Tooltip>
        }
      >
        <ProgressBar
          now={calcPercent(moneyUsed, totalBudget)}
          bsStyle="success"
          className={styles.progressBarControl}
        />
      </OverlayTrigger>
    </div>
  </Row>);

Header.propTypes = {
  moneyUsed: PropType.number.isRequired,
  totalBudget: PropType.number.isRequired,
};

export default Header;
