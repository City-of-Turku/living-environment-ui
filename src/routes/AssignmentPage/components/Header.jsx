import React from 'react';
import PropType from 'prop-types';
import { Row, OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import currencyFormatter from 'currency-formatter';

import styles from './Header.less';

const calcPercent = (moneyUsed, totalBudget) => 100 * (moneyUsed / totalBudget);

const Header = ({ moneyUsed, totalBudget }) => (
  <Row className={styles.root}>
    <div className={styles.label}>Nykyinen budjetti</div>
    <div className={styles.progressBarWrapper}>
      <OverlayTrigger
        placement="bottom"
        overlay={
          <Tooltip id="progress" className={moneyUsed > totalBudget ? 'failed' : 'success'}>
            {`${currencyFormatter.format(moneyUsed,
              { locale: 'fi-FI' })} / ${currencyFormatter.format(totalBudget,
              { locale: 'fi-FI' })}`}
          </Tooltip>
        }
      >
        <ProgressBar
          now={calcPercent(moneyUsed, totalBudget)}
          bsStyle={moneyUsed > totalBudget ? 'danger' : 'success'}
          className={styles.progressBarControl}
        />
      </OverlayTrigger>
    </div>
    <div className={styles.budgetingTotalUsed}>
      {currencyFormatter.format(moneyUsed,
        { locale: 'fi-FI' })} / {currencyFormatter.format(totalBudget,
        { locale: 'fi-FI' })}
    </div>
  </Row>);

Header.propTypes = {
  moneyUsed: PropType.number.isRequired,
  totalBudget: PropType.string.isRequired,
};

export default Header;
