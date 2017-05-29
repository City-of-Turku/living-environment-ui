import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';

import styles from './OpenTextReport.less';

const OpenTextReport = ({ data }) => (<div className={styles.root}>
  <ContentWrapper id="_" />
  { // eslint-disable-next-line react/no-array-index-key
    data.map((section, sectionIndex) => (<ContentWrapper id={`section-${section}`} key={sectionIndex}>
      <h2>{section.title}</h2>
      {
        section.sectionQuestionsAndAnswers.map( // eslint-disable-next-line react/no-array-index-key
          (questionAndAnswers, index) => (<div key={index}>
            <h3>{questionAndAnswers.question}</h3>
            <div className={styles.answers}>
              {
                questionAndAnswers.answers.map(
                  (answer, answerIndex) => (<div // eslint-disable-next-line react/no-array-index-key
                    key={`${index}-${answerIndex}`}
                    className={styles.answer}
                  >{answer}</div>))
              }
            </div>
          </div>))
      }
      {section.question}
    </ContentWrapper>))
  }
</div>);

OpenTextReport.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    sectionQuestionsAndAnswers: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.string),
    })),
    title: PropTypes.string,
  })).isRequired,
};

export default OpenTextReport;
