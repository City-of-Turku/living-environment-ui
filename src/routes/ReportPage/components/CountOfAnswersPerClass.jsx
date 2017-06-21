import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import ContentWrapper from '../../../containers/ContentWrapper';

import styles from './CountOfAnswers.less';

const CountOfAnswersPerClass = ({ report }) => (<ContentWrapper id="countOfAnswersPerClass">
  <h2>Vastauksien lukumäärä per luokka</h2>
  <div className={styles.tableWrapper}>
    <Table striped>
      <thead>
        <tr>
          <th>Luokka</th>
          <th>Lukumäärä</th>
        </tr>
      </thead>
      <tbody>
        { // eslint-disable-next-line react/no-array-index-key
          ((report.submissions || []).per_class || []).map((schoolCount, index) => (<tr key={index}>
            <td>{schoolCount.school_class__name}</td>
            <td>{schoolCount.count}</td>
          </tr>))
        }
      </tbody>
    </Table>
  </div>
</ContentWrapper>);

CountOfAnswersPerClass.propTypes = {
  report: PropTypes.shape({
    submissions: PropTypes.shape({
      per_class: PropTypes.arrayOf(PropTypes.shape({
        school_class__name: PropTypes.string,
        count: PropTypes.number,
      })),
    }),
  }).isRequired,
};

export default CountOfAnswersPerClass;
