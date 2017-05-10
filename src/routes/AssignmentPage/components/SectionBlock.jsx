import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';
import OpenTextTask from './OpenTextTask';
import parseQueryString from '../../../components/helpers/urlHelpers';
import Video from '../../../components/Video';

import styles from './SectionBlock.less';

const openTextTasks = (tasks) => {
  const openTextTaskList = tasks.filter(task => task.task_type === 'open_text_task');
  if (openTextTaskList.length === 0) {
    return null;
  }
  return openTextTaskList.map(task => (<OpenTextTask {...task} />));
};

const video = (task) => {
  const videoUrl = task.video;
  const queryString = parseQueryString(videoUrl);
  return (<Video videoId={queryString.v} />);
};

const SectionBlock = ({ section }) => (
  <ContentWrapper id={`${section.id}-section`}>
    { video(section) }
    <h3>{section.title}</h3>
    <div
      className={section.tasks.length ? styles.separator : ''}
      dangerouslySetInnerHTML={{ __html: section.description }} // eslint-disable-line react/no-danger
    />
    { openTextTasks(section.tasks)}
  </ContentWrapper>
);

SectionBlock.propTypes = {
  section: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    video: PropTypes.string,
  }).isRequired
};

export default SectionBlock;
