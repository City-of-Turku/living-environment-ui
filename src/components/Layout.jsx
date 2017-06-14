import React from 'react';
import PropType from 'prop-types';
import classnames from 'classnames';

import Header from '../containers/Header';
import SideBar from '../containers/SideBar';
import Alerts from '../containers/Alerts';

import '../styling/styles.global.less';
import styles from './Layout.less';

const Layout = ({ children, sideMenuShown }) => (
  <div className={styles.root}>
    <Alerts />
    <Header />
    <div className={classnames(styles.sideBarWrapper, sideMenuShown ? styles.sideMenuShown : '')}>
      <SideBar />
    </div>
    <div className={styles.contentWrapper}>
      {children}
    </div>
  </div>);

Layout.propTypes = {
  children: PropType.node.isRequired,
  sideMenuShown: PropType.bool.isRequired,
};

export default Layout;
