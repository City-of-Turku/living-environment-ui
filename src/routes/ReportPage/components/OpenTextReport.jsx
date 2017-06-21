import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';

import styles from './OpenTextReport.less';

const OpenTextReport = ({ report }) => (<ContentWrapper id="openTextReport">
  <h2>Avoimet tekstikentät</h2>
  { // eslint-disable-next-line react/no-array-index-key
    report.map((section, sectionIndex) => (<div key={sectionIndex}>
      <h3>{section.title}</h3>
      {
        section.sectionQuestionsAndAnswers.map(
          (questionAndAnswers, index) =>  // eslint-disable-next-line react/no-array-index-key
            (questionAndAnswers.answers.length ? (<div key={index}>
              <h4 className={styles.qeustionTitle}>{questionAndAnswers.question}</h4>
              <div className={styles.answers}>
                {
                questionAndAnswers.answers.map(
                  (answer, answerIndex) => (<div // eslint-disable-next-line react/no-array-index-key
                    key={`${index}-${answerIndex}`}
                    className={styles.answer}
                  >{answer}</div>))
                }
              </div>
            </div>) : null))
      }
      {section.question}
    </div>))
  }
</ContentWrapper>);

OpenTextReport.propTypes = {
  report: PropTypes.arrayOf(PropTypes.shape({
    sectionQuestionsAndAnswers: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.string),
    })),
    title: PropTypes.string,
  })).isRequired,
};

export default OpenTextReport;
