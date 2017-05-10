const validate = (values) => {
  const errors = {};
  if (!values.school) {
    errors.school = 'Vaadittu';
  }
  if (!values.schoolClass) {
    errors.schoolClass = 'Vaadittu';
  }
  return errors;
};

export default validate;
