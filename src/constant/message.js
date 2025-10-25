export const INPUT_MESSAGE = Object.freeze({
  CAR_NAME: '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
  TRY_COUNT: '시도할 횟수는 몇 회인가요?\n',
});

export const OUTPUT_MESSAGE = Object.freeze({
  FINAL_WINNER: (winners) => `최종 우승자: ${winners}`,
  ROUND_RESULT: (carName, repeatedIcon, location) =>
    `${carName} : ${repeatedIcon.repeat(location)}`,
});

export const ERROR_MESSAGE = Object.freeze({
  INVALID_CAR_NAME_NEVER_EMPTY: '자동차 이름은 한 개 이상 입력해야 합니다.',
  INVALID_CAR_NAME_LENGTH: '자동차 이름은 5자 이하이어야 합니다.',
  EMPTY_TRY_COUNT: '시도 횟수를 입력해야 합니다.',
  NON_NUMERIC_TRY_COUNT: '시도 횟수는 숫자여야 합니다.',
  NON_INTEGER_TRY_COUNT: '시도 횟수는 정수여야 합니다.',
  NON_POSITIVE_TRY_COUNT: '시도 횟수는 양수여야 합니다.',
});
