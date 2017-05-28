import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import ContentWrapper from '../../../containers/ContentWrapper';

const CountOfAnswersPerClass = ({ report }) => (<div>
  <ContentWrapper>
    <h1>Count of Answers per Class</h1>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>School</th>
          <th>Count</th>
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
  </ContentWrapper>
</div>);

CountOfAnswersPerClass.propTypes = {
  report: PropTypes.shape({
    submissions: PropTypes.shape({
      per_class: PropTypes.shape({
        school_class__name: PropTypes.string,
        count: PropTypes.number,
      })
    }),
  }).isRequired,
};

export default CountOfAnswersPerClass;
