import React from 'react';
import PropTypes from 'prop-types';

import BudgetingTargetMap from './BudgetingTargetMap';
import CountOfAnswersPerClass from './CountOfAnswersPerClass';
import CountOfAnswersPerSchool from './CountOfAnswersPerSchool';
import Filter from './Filter';
import OpenTextReport from './OpenTextReport';
import * as TaskType from '../../../constants/taskTypes/index';

import styles from './ReportPage.less';

const getOpenTextAnswersForSection = (section) => {
  const { open_text_tasks, title } = section;
  // eslint-disable-next-line camelcase
  const sectionQuestionsAndAnswers = (open_text_tasks || []).map(
    ({ question, answers }) => ({
      question,
      answers: (answers || []).map(({ answer }) => answer)
    }));
  return { sectionQuestionsAndAnswers, title };
};

const getOpenTextAnswers = report => (report.sections || []).map(
  section => getOpenTextAnswersForSection(section));

const getMaskPolygon = (area) => {
  if(area?.coordinates){
    return area.coordinates[0].map(([y, x]) => [x, y]);
  }
  return [];
};

const getBudgetingTargetPoint = (budgetingTarget) => {
  const {point} = budgetingTarget;

  if(point?.coordinates){
    const [lng, lat] = point.coordinates || [0, 0];
    return [lat, lng];
  }

  return [0, 0];
};

const getBudgetingTarget = budgetingTarget => ({
  point: getBudgetingTargetPoint(budgetingTarget),
  name: (budgetingTarget.target || { name: '' }).name,
  icon: (budgetingTarget.target || { icon: '' }).icon,
});

const getBudgetingTargetMapForSection = (section) => {
  const { budgeting_tasks, title } = section;
  const sectionTargetMap = (budgeting_tasks || []) // eslint-disable-line camelcase
    .filter(task => task.budgeting_type === TaskType.BudgetingMapTask)
    .map(
      ({ name, answers }) => ({
        name,
        targets: answers.map(budgetingTarget => getBudgetingTarget(budgetingTarget)),
      }));
  return { sectionTargetMap, title };
};

const getBudgetingTargetMap = report => ({
  sections: (report.sections || []).map(
    section => getBudgetingTargetMapForSection(section)),
  area: getMaskPolygon(report.area),
});

const openTextReportHasAnswers =
  report => (report.sections || []).reduce(
    (acc, section) => acc + (
      (section.budgeting_tasks || []).reduce((accAnswers, answer) => answer.length, 0)
    ), 0) !== 0;

const budgetingTargetMapHasPins = report => (report.sections || []).reduce(
  (acc, section) => acc + section.open_text_tasks.length, 0) !== 0;

const ReportPage = ({ report, updateFilter }) => (
  <div className={styles.root}>
    <div className={styles.topContent}>
      <h1>{report.name} raportti</h1>
      { report.schools && <Filter updateFilter={updateFilter} schools={report.schools || []} /> }
    </div>
    <CountOfAnswersPerSchool report={report} />
    <CountOfAnswersPerClass report={report} />
    { openTextReportHasAnswers(report) && <OpenTextReport report={getOpenTextAnswers(report)} /> }
    { budgetingTargetMapHasPins(report) && <BudgetingTargetMap report={getBudgetingTargetMap(report)} /> }
  </div>
);

ReportPage.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.object,
    sections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      open_text_tasks: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string,
        answers: PropTypes.arrayOf(PropTypes.shape({
          answer: PropTypes.string,
        })),
      }))
    })),
    schools: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      classes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })),
    })),
    submissions: PropTypes.shape({
      per_school: PropTypes.arrayOf(PropTypes.shape({
        school__name: PropTypes.string,
        count: PropTypes.number,
      })),
    }),
  }).isRequired,
  updateFilter: PropTypes.func.isRequired,
};

ReportPage.defaultProps = {
  schools: [],
};

export default ReportPage;
