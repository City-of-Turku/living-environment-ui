import React from 'react';
import PropType from 'prop-types';

import Header from './Header';
import SideBar from '../containers/SideBar';

import '../styling/styles.global.less';
import styles from './Layout.less';

const Layout = ({ children }) => (
  <div className={styles.root}>
    <div className={styles.sideBarWrapper}>
      <SideBar />
    </div>
    <div className={styles.contentWrapper}>
      <Header current={80000} total={100000} />
      {children}
    </div>
  </div>);

Layout.propTypes = {
  children: PropType.node.isRequired,
};

export default Layout;
