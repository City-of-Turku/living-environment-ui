import React from 'react';

import styles from './ContentWrapper.less';

const ContentWrapper = ({ children }) => (
  <div className={styles.root}>
    {children}
  </div>
);

export default ContentWrapper;
