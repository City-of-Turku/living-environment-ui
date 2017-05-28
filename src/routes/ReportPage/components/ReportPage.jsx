import React from 'react';
import PropTypes from 'prop-types';

import CountOfAnswersPerSchool from './CountOfAnswersPerSchool';
import OpenTextReport from './OpenTextReport';

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

const ReportPage = ({ report }) => (<div className={styles.root}>
  <OpenTextReport data={getOpenTextAnswers(report)} />
  <CountOfAnswersPerSchool report={report} />
</div>);

ReportPage.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string,
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
      per_school: PropTypes.shape({
        school__name: PropTypes.string,
        count: PropTypes.number,
      })
    }),
  }).isRequired,
};

ReportPage.defaultProps = {
};

export default ReportPage;
