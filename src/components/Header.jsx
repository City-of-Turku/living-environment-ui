import React from 'react';
import PropType from 'prop-types';
import { Row } from 'react-bootstrap';
import classnames from 'classnames';

import styles from './Header.less';


const Header = ({ toggleMenu }) => (
  <Row className={styles.root}>
    <div className={styles.contentWrapper}>
      <div className={styles.toggleButtonWrapper}>
        <button className={classnames('fa fa-bars', styles.button)} onClick={toggleMenu} role="button" />
      </div>
      <div className={styles.logoWrapper}>
        <i className={classnames('glyphfont', 'turku-logo', styles.logo)} />
      </div>
    </div>
  </Row>);

Header.propTypes = {
  toggleMenu: PropType.func.isRequired,
};

export default Header;
