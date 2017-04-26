import React from 'react';
import PropTypes from 'prop-types';

export const renderField = (field) => { // eslint-disable-line import/prefer-default-export
  const attributes = {
    ...field.input,
    placeholder: field.placeholder || field.label,
    type: field.type,
    className: 'form-control',
  };

  return (
    <div>
      { field.label && <label htmlFor={name}>{field.label}</label> }
      <div>
        { field.type ? <textarea {...attributes} />
          : <input {...attributes} />
        }
      </div>
    </div>
  );
};

renderField.PropTypes = {
  field: PropTypes.object.isRequired,
};
