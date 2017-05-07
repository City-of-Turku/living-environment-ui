const validate = (values) => {
  const errors = {};
  if (!values.school) {
    errors.school = 'Required';
  }
  if (!values.schoolClass) {
    errors.schoolClass = 'Required';
  }
  return errors;
};

export default validate;
