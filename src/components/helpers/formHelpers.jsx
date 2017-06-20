import React from 'react';
import { Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumericInput from 'react-numeric-input';


const formatNumericField = number => number.toString().replace('.', ',');

const parseNumericField = numberString => parseFloat((numberString || '').replace(',', '.')) || 0;

export const renderField = (field) => { // eslint-disable-line import/prefer-default-export
  const placeholder = field.placeholder || field.label;
  // all input types except textarea, select and error
  const otherTypes = field.type !== 'textarea' && field.type !== 'select' && field.type !== 'error';
  const { touched, error } = field.meta;
  const tooltipError = field.tooltipError;
  const suppressErrors = field.suppressErrors || tooltipError;
  const wrapperClass = field.className || 'form-group';
  const attributes = {
    ...field.input,
    placeholder,
    type: field.type,
    className: 'form-control',
  };
  if (field.precision) {
    attributes.precision = field.precision;
  }
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
          ? <div><NumericInput {...attributes} parse={parseNumericField} format={formatNumericField} /></div>
          : <input {...attributes} />)}
        { !suppressErrors && <div className="help-block">
          {hasError && (<span>{error}</span>)}
        </div>}
        {
          tooltipError && hasError && (
            <Tooltip placement="bottom" className="in failed" id="tooltip-bottom">
              {error}
            </Tooltip>)
        }
      </div>
    </div>
  );
};

renderField.PropTypes = {
  field: PropTypes.object.isRequired,
};
