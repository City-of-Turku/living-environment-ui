import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './Alerts.less';

const iconClass = type => ((type === 'success' || type === 'info') ? 'fa-check' : 'fa-exclamation');

const Alerts = ({ text, details, type, shown }) => (<div className={classnames(styles.root, { [styles.shown]: shown })}>
  <div className={styles.wrapper}>
    <Alert bsStyle={type || 'success'}>
      <div className={styles.contentWrapper}>
        <i className={classnames(`fa ${iconClass(type)}`, styles.icon)} />
        <div>{text}</div>
        <div className={styles.details}>{details}</div>
      </div>
    </Alert>
  </div>
</div>);

Alerts.propTypes = {
  text: PropTypes.string.isRequired,
  details: PropTypes.string,
  type: PropTypes.string,
  shown: PropTypes.bool,
};

Alerts.defaultProps = {
  details: null,
  type: 'success',
  shown: true,
};

export default Alerts;
