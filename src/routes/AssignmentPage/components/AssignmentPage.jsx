import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';
import Header from './Header';
import MyInformation from './MyInformation';
import OpenTextTask from './OpenTextTask';
import SubmitAssignment from './SubmitAssignment';
import TaskInfoBar from './TaskInfoBar';
import TaskContent from './TaskContent';

import styles from './AssignmentPage.less';

class AssignmentPage extends Component {

  openTextTasks(assignmentId, section) {
    const tasks = section.tasks
    .filter(task => task.task_type === 'open_text_task');
    if (tasks.length === 0) {
      return null;
    }
    return tasks.map(task => (
      <ContentWrapper id={`${assignmentId}-${task.id}-open-text-task`}>
        <OpenTextTask {...task} />
      </ContentWrapper>)
    );
  }

  render() {
    const { assignment, handleSubmit, onSubmit } = this.props;
    if (!assignment) {
      return null;
    }
    return (<section className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContentWrapper id="_" />
        <div className={styles.headerWrapper}>
          <Header moneyUsed={3} totalBudget={5} />
        </div>
        <ContentWrapper id={`${assignment.id}-assignment`}>
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
        <ContentWrapper id={`${assignment.id}-assignment-my-information`}>
          <MyInformation schools={assignment.schools} />
        </ContentWrapper>
        {
          assignment.sections && assignment.sections.map(
            section => this.openTextTasks(assignment.id, section))
        }
        <SubmitAssignment />
      </form>
    </section>);
  }
}

AssignmentPage.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

AssignmentPage.defaultProps = {
  assignment: null,
};

export default AssignmentPage;
