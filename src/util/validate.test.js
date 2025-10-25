import { validate } from './validate.js';

// validate 검증
describe('validate 테스트', () => {
  // isNumber 테스트
  test('isNumber 테스트', () => {
    expect(validate.isNumber('5')).toBe(true);
    expect(validate.isNumber('abc')).toBe(false);
  });

  test('isInteger 테스트', () => {
    const isInteger = (input) => {
      const number = Number(input);
      return Number.isInteger(number);
    };

    expect(isInteger('5')).toBe(true);
    expect(isInteger('5.5')).toBe(false);
    expect(isInteger('abc')).toBe(false);
  });

  test('isEmpty 테스트', () => {
    expect(validate.isEmpty('   ')).toBe(true);
    expect(validate.isEmpty('abc')).toBe(false);
  });

  test('isPositiveNumber 테스트', () => {
    expect(validate.isPositiveNumber('5')).toBe(true);
    expect(validate.isPositiveNumber('-3')).toBe(false);
    expect(validate.isPositiveNumber('0')).toBe(false);
  });
});
