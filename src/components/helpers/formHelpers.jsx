import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumericInput from 'react-numeric-input';

export const renderField = (field) => { // eslint-disable-line import/prefer-default-export
  const placeholder = field.placeholder || field.label;
  // all input types except textarea, select and error
  const otherTypes = field.type !== 'textarea' && field.type !== 'select' && field.type !== 'error';
  const { touched, error } = field.meta;
  const suppressErrors = field.suppressErrors;
  const wrapperClass = field.className || 'form-group';
  const attributes = {
    ...field.input,
    placeholder,
    type: field.type,
    className: 'form-control',
  };
  const hasError = touched && error;
  return (
    <div>
      { field.label && <label htmlFor={name} className="control-label">{field.label}</label> }
      <div className={classnames(wrapperClass, hasError && 'has-error')}>
        { field.type === 'textarea' && <textarea {...attributes} /> }
        { field.type === 'select' &&
          <select {...attributes}>
            {
              placeholder && <option key={placeholder} value="">{placeholder}</option>
            }
            {
              field.options.map(option => (
                <option key={option[field.optionsKey]} value={option[field.optionsKey]}>
                  {option[field.optionsValue]}
                </option>))
            }
          </select>
        }
        { otherTypes && (attributes.type === 'number'
          ? <div><NumericInput precision={2} {...attributes} /></div> : <input {...attributes} />)}
        { !suppressErrors && <div className="help-block">
          {hasError && (<span>{error}</span>)}
        </div>}
      </div>
    </div>
  );
};

renderField.PropTypes = {
  field: PropTypes.object.isRequired,
};
