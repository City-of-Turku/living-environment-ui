import React from 'react';
import PropTypes from 'prop-types';

export const renderField = (field) => { // eslint-disable-line import/prefer-default-export
  const placeholder = field.placeholder || field.label;
  // all input types except textarea and select
  const otherTypes = field.type !== 'textarea' && field.type !== 'select';
  const attributes = {
    ...field.input,
    placeholder,
    type: field.type,
    className: 'form-control',
  };

  return (
    <div>
      { field.label && <label htmlFor={name}>{field.label}</label> }
      <div>
        { field.type === 'textarea' && <textarea {...attributes} /> }
        { field.type === 'select' &&
          <select {...attributes}>
            {
              placeholder && <option key={placeholder}>{placeholder}</option>
            }
            {
              field.options.map(option => (
                <option key={option[field.optionsKey]} value={option[field.optionsKey]}>
                  {option[field.optionsValue]}
                </option>))
            }
          </select>
        }
        { otherTypes && <input {...attributes} /> }
      </div>
    </div>
  );
};

renderField.PropTypes = {
  field: PropTypes.object.isRequired,
};
