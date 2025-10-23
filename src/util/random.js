import { MissionUtils } from '@woowacourse/mission-utils';

export const getRandomInt = (min, max) =>
  MissionUtils.Random.pickNumberInRange(min, max);
