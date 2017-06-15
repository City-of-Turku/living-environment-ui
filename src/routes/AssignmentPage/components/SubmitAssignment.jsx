import React from 'react';
import PropTypes from 'prop-types';

import ContentWrapper from '../../../containers/ContentWrapper';

const SubmitAssignment = ({ submitButtonEnabled }) => (
  <ContentWrapper id="submitAssignment">
    <button type="submit" disabled={!submitButtonEnabled}>Lähetä tiedot</button>
  </ContentWrapper>
);

SubmitAssignment.propTypes = {
  submitButtonEnabled: PropTypes.bool,
};

SubmitAssignment.defaultProps = {
  submitButtonEnabled: true,
};

export default SubmitAssignment;
