import React from 'react';
import PropType from 'prop-types';
import YouTube from 'react-youtube';

import styles from './Video.less';

const Video = ({ videoId }) => (
  <div className={styles.videoWrapper}>
    <YouTube
      className={styles.video}
      videoId={videoId}
    />
  </div>);

Video.propTypes = {
  videoId: PropType.string.isRequired,
};

export default Video;
