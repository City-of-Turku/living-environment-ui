import React from 'react';
import PropTypes from 'prop-types';

import BudgetingTargetMap from './BudgetingTargetMap';
import CountOfAnswersPerClass from './CountOfAnswersPerClass';
import CountOfAnswersPerSchool from './CountOfAnswersPerSchool';
import OpenTextReport from './OpenTextReport';

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

const getMaskPolygon = (areaJSON) => {
  try {
    const area = JSON.parse(areaJSON.replace(/"/g, '').replace(/'/g, '"'));
    return area.coordinates[0].map(([y, x]) => [x, y]);
  } catch (e) {
    return [];
  }
};

const getBudgetingTargetPoint = (budgetingTarget) => {
  const pointJson = budgetingTarget.point;
  try {
    const pointObject = JSON.parse(pointJson);
    return pointObject.coordinates || [0, 0];
  } catch (err) {
    return [0, 0]; // can't parse the point json
  }
};

const getBudgetingTarget = budgetingTarget => ({
  point: getBudgetingTargetPoint(budgetingTarget),
  name: (budgetingTarget.target || { name: '' }).name,
  icon: (budgetingTarget.target || { icon: '' }).icon,
});

const getBudgetingTargetMapForSection = (section) => {
  const { budgeting_tasks, title } = section;
  const sectionTargetMap = (budgeting_tasks || []).map( // eslint-disable-line camelcase
    ({ name, targets }) => ({
      name,
      targets: targets.map(budgetingTarget => getBudgetingTarget(budgetingTarget)),
    }));
  return { sectionTargetMap, title };
};

const getBudgetingTargetMap = report => ({
  sections: (report.sections || []).map(
    section => getBudgetingTargetMapForSection(section)),
  area: getMaskPolygon(report.area),
});

const ReportPage = ({ report }) => (<div>
  <OpenTextReport report={getOpenTextAnswers(report)} />
  <BudgetingTargetMap report={getBudgetingTargetMap(report)} />
  <CountOfAnswersPerClass report={report} />
  <CountOfAnswersPerSchool report={report} />
</div>);

ReportPage.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string,
    area: PropTypes.string,
    sections: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      open_text_tasks: PropTypes.arrayOf(PropTypes.shape({
        question: PropTypes.string,
        answers: PropTypes.arrayOf(PropTypes.shape({
          answer: PropTypes.string,
        })),
      }))
    })),
    submissions: PropTypes.shape({
      per_school: PropTypes.arrayOf(PropTypes.shape({
        school__name: PropTypes.string,
        count: PropTypes.number,
      })),
    }),
  }).isRequired,
};

ReportPage.defaultProps = {
};

export default ReportPage;
