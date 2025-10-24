export const validate = {
  isNumber(input) {
    const number = Number(input);
    return !Number.isNaN(number);
  },
  isInteger(input) {
    const number = Number(input);
    return Number.isInteger(number);
  },
};
