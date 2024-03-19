import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import BudgetingMapTask from './BudgetingMapTask';
import BudgetingTextTask from '../containers/BudgetingTextTask';
import ContentWrapper from '../../../containers/ContentWrapper';
import FriendsOfParkMap from './FriendsOfParkMap';
import OpenTextTask from './OpenTextTask';
import parseQueryString from '../../../components/helpers/urlHelpers';
import Video from '../../../components/Video';
import * as TaskType from '../../../constants/taskTypes/index';

import styles from './SectionBlock.less';

const getMaskPolygon = (assignment) => {
  if (assignment?.area?.coordinates) {
    return assignment.area.coordinates[0].map(([y, x]) => [x, y]);
  }
  return [];
};

const createTaskList = (assignment, sectionId, tasks) => tasks.reduce((acc, task) => {
  const maskPolygon = getMaskPolygon(assignment);
  // open text task
  if (task.task_type === TaskType.OpenTextTask) {
    acc.push(<OpenTextTask
      {...{ ...task, className: styles.separator, key: task.id }}
    />);
    //  budgeting map task
  } else if (task.task_type === TaskType.BudgetingTask
    && task.data.budgeting_type === TaskType.BudgetingMapTask) {
    acc.push(<BudgetingMapTask
      {...{ task, maskPolygon, sectionId, className: styles.separator, key: task.id }}
    />);
    // budgeting text task
  } else if (task.task_type === TaskType.BudgetingTask
    && task.data.budgeting_type === TaskType.BudgetingTextTask) {
    acc.push(<BudgetingTextTask
      {...{ task, className: styles.separator, key: task.id }}
    />);
    // friends of the park
  } else if (task.task_type === TaskType.VoluntarySignupTask) {
    acc.push(<FriendsOfParkMap
      friends={[]}
      sectionId={sectionId}
      maskPolygon={maskPolygon}
      task={task}
      key={task.id}
      name={task.data.name}
    />);
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

const SectionBlock = ({ assignment, section }) => (
  <ContentWrapper id={`${section.id}-section`}  role="section">
    { video(section) }
    <h2>{section.title}</h2>
    <Row>
      <Col lg={8} lgOffset={2}>
        <div
          className={styles.sectionHTMLContent}
          dangerouslySetInnerHTML={{ __html: section.description }} // eslint-disable-line react/no-danger
        />
      </Col>
    </Row>
    { createTaskList(assignment, section.id, section.tasks)}
  </ContentWrapper>
);

SectionBlock.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  section: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    video: PropTypes.string,
    tasks: PropTypes.arrayOf(PropTypes.object)
  }).isRequired
};

export default SectionBlock;
