import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';
import Header from './Header';
import MyInformation from './MyInformation';
import SectionBlock from './SectionBlock';
import SubmitAssignment from './SubmitAssignment';
import TaskInfoBar from './TaskInfoBar';
import TaskContent from './TaskContent';
import TopImage from './TopImage';

import styles from './AssignmentPage.less';

class AssignmentPage extends Component {
  constructor(props) {
    super(props);

    this.tasksCount = this.tasksCount.bind(this);
    this.sectionTasksCount = this.sectionTasksCount.bind(this);
  }

  sectionTasksCount(section) { // eslint-disable-line class-methods-use-this
    return (section.tasks || []).length;
  }

  tasksCount(assignment) {
    return (assignment.sections || []).reduce(
      (acc, section) => acc + this.sectionTasksCount(section), 0);
  }

  render() {
    const { assignment, budget, handleSubmit, onSubmit, submitButtonEnabled } = this.props;
    if (!assignment) {
      return null;
    }
    return (<section className={styles.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ContentWrapper id="_" />
        <Header moneyUsed={budget.spent} totalBudget={assignment.budget} />
        <ContentWrapper id={`${assignment.id}-assignment`}>
          <TopImage url={assignment.image} altText={assignment.header} />
          <TaskInfoBar
            tasksCount={this.tasksCount(assignment)}
            totalBudget={assignment.budget}
          />
          <TaskContent
            body={assignment.description}
            title={assignment.header}
          />
        </ContentWrapper>
        <ContentWrapper id={`${assignment.id}-assignment-my-information`}>
          <MyInformation schools={assignment.schools} />
        </ContentWrapper>
        {
          assignment.sections && assignment.sections.map(
            section => <SectionBlock assignment={assignment} section={section} key={section.id} />)
        }
        <SubmitAssignment submitButtonEnabled={submitButtonEnabled} />
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
  budget: PropTypes.shape({
    spent: PropTypes.number,
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonEnabled: PropTypes.bool,
};

AssignmentPage.defaultProps = {
  assignment: null,
  submitButtonEnabled: true,
};

export default AssignmentPage;
