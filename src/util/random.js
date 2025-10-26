import { MissionUtils } from '@woowacourse/mission-utils';

export const getRandomInt = (min = 0, max = 9) =>
  MissionUtils.Random.pickNumberInRange(min, max);
