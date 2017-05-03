import React from 'react';
import PropTypes from 'prop-types';

import styles from './TaskContent.less';

const TaskContent = ({ title, description, body }) => (
  <div className={styles.root}>
    <div className={styles.head}>
      <h1>{title}</h1>
      {
        description && <p>{description}</p>
      }
    </div>
    <div
      className={styles.body}
      dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
    />
  </div>);

TaskContent.propTypes = {
  body: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
};

TaskContent.defaultProps = {
  body: '',
  description: '',
};

export default TaskContent;
