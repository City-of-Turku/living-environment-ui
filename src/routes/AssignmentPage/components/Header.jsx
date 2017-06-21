import React from 'react';
import PropType from 'prop-types';
import { OverlayTrigger, ProgressBar, Tooltip } from 'react-bootstrap';
import currencyFormatter from 'currency-formatter';

import styles from './Header.less';

const calcPercent = (moneyUsed, totalBudget) => 100 * (moneyUsed / totalBudget);

const Header = ({ moneyUsed, totalBudget }) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <div className={styles.label}>Nykyinen budjetti</div>
      <div className={styles.progressBarWrapper}>
        <OverlayTrigger
          placement="bottom"
          overlay={
            <Tooltip id="progress">
              Budjetista käytetty {Math.round(calcPercent(moneyUsed, totalBudget))}%
            </Tooltip>
          }
        >
          <ProgressBar
            now={calcPercent(moneyUsed, totalBudget)}
            bsStyle={moneyUsed > totalBudget ? 'danger' : 'success'}
            className={styles.progressBarControl}
          />
        </OverlayTrigger>
        <div className={styles.budgetingTotalUsed}>
          <span className={moneyUsed > totalBudget ? 'over' : 'under'}>
            {currencyFormatter.format(moneyUsed, { locale: 'fi-FI' })}
          </span>
          <span> / {currencyFormatter.format(totalBudget, { locale: 'fi-FI' })}</span>
        </div>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  moneyUsed: PropType.number.isRequired,
  totalBudget: PropType.string.isRequired,
};

export default Header;
