import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';
import Header from './Header';
import OpenTextTask from './OpenTextTask';
import TaskInfoBar from './TaskInfoBar';
import TaskContent from './TaskContent';

import styles from './AssignmentPage.less';


const openTextTasks = (tasks) => {
  if (tasks.length === 0) {
    return null;
  }
  return tasks.map(task => (
    <ContentWrapper id={`${task.id}-open-text-map`}>
      <OpenTextTask {...task} />
    </ContentWrapper>)
  );
};

const AssignmentPage = ({ assignment }) => (
  <section>
    <ContentWrapper id="_" />
    <div className={styles.root}>
      <Header moneyUsed={3} totalBudget={5} />
      { assignment && <ContentWrapper id={`${assignment.id}-assignment`}>
        <div className={styles.heroImageWrapper}>
          <img
            className={styles.heroImage}
            src="http://placehold.it/750x250"
            alt=""
          />
        </div>
        <TaskInfoBar
          categoryName={'Example Category'}
          tasks={{ completed: 10, total: 20 }}
          totalBudget={100000}
        />
        <TaskContent
          body={assignment.description}
          title={assignment.name}
        />
      </ContentWrapper>
      }
      {
        assignment && assignment.sections && assignment.sections.map(section => (
          openTextTasks(section.open_text_tasks)
        ))
      }
    </div>
  </section>
);

AssignmentPage.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

AssignmentPage.defaultProps = {
  assignment: null,
};

export default AssignmentPage;
