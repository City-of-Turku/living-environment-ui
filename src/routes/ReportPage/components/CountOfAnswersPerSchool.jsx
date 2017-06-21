import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import ContentWrapper from '../../../containers/ContentWrapper';

import styles from './CountOfAnswers.less';

const CountOfAnswersPerSchool = ({ report }) => (<ContentWrapper id="countOfAnswersPerSchool">
  <h2>Vastauksien lukumäärä per koulu</h2>
  <div className={styles.tableWrapper}>
    <Table striped>
      <thead>
        <tr>
          <th>Koulu</th>
          <th>Lukumäärä</th>
        </tr>
      </thead>
      <tbody>
        { // eslint-disable-next-line react/no-array-index-key
          ((report.submissions || []).per_school || []).map((schoolCount, index) => (<tr key={index}>
            <td>{schoolCount.school__name}</td>
            <td>{schoolCount.count}</td>
          </tr>))
        }
      </tbody>
    </Table>
  </div>
</ContentWrapper>);

CountOfAnswersPerSchool.propTypes = {
  report: PropTypes.shape({
    submissions: PropTypes.shape({
      per_school: PropTypes.arrayOf(PropTypes.shape({
        school__name: PropTypes.string,
        count: PropTypes.number,
      })),
    }),
  }).isRequired,
};

export default CountOfAnswersPerSchool;
