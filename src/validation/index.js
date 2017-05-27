export const number = value => (value && isNaN(Number(value)) ? 'A number is expected' : undefined);

export const range = (value, min, max) => { // eslint-disable-line import/prefer-default-export
  const minDefined = typeof min === 'number';
  const maxDefined = typeof max === 'number';
  if (minDefined && maxDefined) {
    if (min > max) {
      return console.warn(`min value ${min} can't be greater then max value ${max}`); // eslint-disable-line
    }
    if (value < min || value > max) {
      return `Arvon on oltava väliltä ${min} ja ${max}`; // The value should be between ${min} and ${max}`
    }
  } else if (minDefined && value < min) {
    return `Arvo ei saa olla pienempi kuin ${min}`; // The value should't be less than ${min}
  } else if (maxDefined && value > max) {
    return `'Arvo ei voi olla suurempi kuin ${max}'`; // The value should't be greater than ${max}
  }
  return undefined; // value is valid as min and max limits are not defined
};
