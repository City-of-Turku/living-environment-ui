import React from 'react';
import PropTypes from 'prop-types';

import BudgetingTextTask from './BudgetingTextTask';
import ContentWrapper from '../../../containers/ContentWrapper';
import OpenTextTask from './OpenTextTask';
import parseQueryString from '../../../components/helpers/urlHelpers';
import Video from '../../../components/Video';
import * as TaskType from '../constants/taskTypes/index';

import styles from './SectionBlock.less';

const createTaskList = tasks => tasks.reduce((acc, task) => {
  if (task.task_type === TaskType.OpenTextTask) {
    acc.push(<OpenTextTask {...{ ...task, className: styles.separator, key: task.id }} />);
  } else if (task.task_type === TaskType.BudgetingTask
      && task.data.budgeting_type === TaskType.BudgetingTextTask) {
    acc.push(<BudgetingTextTask {...{ task: task.data, className: styles.separator, key: task.id }} />);
  } else {
    console.warn(`Unknown task type ${task.task_type} can't be processed`); // eslint-disable-line no-console
  }
  return acc;
}, []);

const video = (task) => {
  const videoUrl = task.video;
  if (!videoUrl) {
    return null;
  }
  const queryString = parseQueryString(videoUrl);
  return (<Video videoId={queryString.v} />);
};

const SectionBlock = ({ section }) => (
  <ContentWrapper id={`${section.id}-section`}>
    { video(section) }
    <h3>{section.title}</h3>
    <div
      dangerouslySetInnerHTML={{ __html: section.description }} // eslint-disable-line react/no-danger
    />
    { createTaskList(section.tasks)}
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
