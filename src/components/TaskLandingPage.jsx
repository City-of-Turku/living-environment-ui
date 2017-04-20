import React from 'react';

import BudgetingTask from './BudgetingTask';
import ContentWrapper from './ContentWrapper';
import MapTask from './MapTask';
import OpenTextTask from './OpenTextTask';
import TaskInfoBar from './TaskInfoBar';
import TaskContent from './TaskContent';

import styles from './TaskLandingPage.less';

const TaskLandingPage = ({sections}) => (
  <section>
    {
      sections.map(section => (
        <div className={styles.root}>
          <ContentWrapper>
            <div className={styles.heroImageWrapper}>
              <img
                className={styles.heroImage}
                src="http://placehold.it/750x250"
                alt=""
              />
            </div>
            <TaskInfoBar
              categoryName={'Example Category'}
              tasks={{completed: 10, total: 20}}
              totalBudget={100000}
            />
            <TaskContent
              body={section.description}
              title={section.title}
            />
          </ContentWrapper>
          {
            section.open_text_tasks && section.open_text_tasks.map( openTextTask => (
              <ContentWrapper id={`${section.id}-${openTextTask.id}-open-text-map`}>
                <OpenTextTask {...openTextTask} />
              </ContentWrapper>
            ))
          }
          {
            section.budgeting_tasks && section.budgeting_tasks.map( budgetingTask => (
              <ContentWrapper id={`${section.id}-${budgetingTask.id}-budgeting_task`}>
                <BudgetingTask {...budgetingTask} />
              </ContentWrapper>
            ))
          }
        </div>))
    }
  </section>
);

export default TaskLandingPage;
