import { validate } from '../src/util/validate.js';

// validate 검증
describe('validate 테스트', () => {
  // isNumber 테스트
  test('isNumber 테스트', () => {
    expect(validate.isNumber('5')).toBe(true);
    expect(validate.isNumber('abc')).toBe(false);
  });
});
