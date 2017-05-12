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
          <TopImage url={assignment.image} altText={assignment.header} />
          <TaskInfoBar
            categoryName={'Example Category'}
            tasks={{ completed: 10, total: 20 }}
            totalBudget={100000}
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
