import React from 'react';

export const renderField = ({ input, label, type, textarea, meta: { touched, error, warning, invalid } }) => {
  // const textareaType = <textarea {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;
  // const inputType = <input {...input} placeholder={label}  type={type} className={`form-control ${touched && invalid ? 'has-danger' : ''}`}/>;

  const attributes = {
    ...input,
    placeholder: label,
    type,
    className: 'form-control',
  };

  console.log('textarea', textarea);
  return (
    <div>
      { label && <label>{label}</label> }
      <div>
        { type ? <textarea {...attributes} />
          : <input {...attributes} />
        }
      </div>
    </div>
  );
};

// {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
