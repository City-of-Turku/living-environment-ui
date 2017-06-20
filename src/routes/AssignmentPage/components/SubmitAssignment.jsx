import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import ContentWrapper from '../../../containers/ContentWrapper';

import styles from './SubmitAssignment.less';


const SubmitAssignment = ({ submitButtonEnabled }) => (
  <ContentWrapper id="submitAssignment">
    <Row>
      <Col md={6} mdOffset={3}>
        <button type="submit" disabled={!submitButtonEnabled} className={styles.submitButton}>Lähetä tiedot</button>
      </Col>
    </Row>
  </ContentWrapper>
);

SubmitAssignment.propTypes = {
  submitButtonEnabled: PropTypes.bool,
};

SubmitAssignment.defaultProps = {
  submitButtonEnabled: true,
};

export default SubmitAssignment;
