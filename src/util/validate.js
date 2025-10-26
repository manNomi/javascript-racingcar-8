export const validate = {
  isNumber(input) {
    const number = Number(input);
    return !Number.isNaN(number);
  },
  isInteger(input) {
    const number = Number(input);
    return Number.isInteger(number);
  },
  isEmpty(input = '') {
    return input.trim() === '';
  },
  isPositiveNumber(input) {
    const number = Number(input);
    return number > 0;
  },
  isDuplicate(input) {
    return input.some((item, index) => input.indexOf(item) !== index);
  },
};
