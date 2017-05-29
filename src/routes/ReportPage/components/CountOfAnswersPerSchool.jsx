import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import ContentWrapper from '../../../containers/ContentWrapper';

import styles from './CountOfAnswersPerSchool.less';

const CountOfAnswersPerSchool = ({ report }) => (<div className={styles.root}>
  <ContentWrapper>
    <h1>Vastauksien lukumäärä per koulu</h1>
    <Table striped bordered condensed hover>
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
  </ContentWrapper>
</div>);

CountOfAnswersPerSchool.propTypes = {
  report: PropTypes.shape({
    submissions: PropTypes.shape({
      per_school: PropTypes.shape({
        school__name: PropTypes.string,
        count: PropTypes.number,
      })
    }),
  }).isRequired,
};

CountOfAnswersPerSchool.defaultProps = {
};

export default CountOfAnswersPerSchool;
