import React from 'react';
import PropTypes from 'prop-types';

const OpenTextTask = ({ id, question }) => (
  <div>
    {question}
  </div>
);

OpenTextTask.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
};


export default OpenTextTask;
