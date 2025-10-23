import { MissionUtils } from '@woowacourse/mission-utils';
import Game from './Game.js';

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

describe('Game 테스트', () => {
  let game;

  beforeEach(() => {
    const inputNames = '"pobi,woni"';
    const inputCount = '1';
    game = new Game(inputNames, inputCount);
  });

  test('Game 객체 생성', () => {
    expect(game).toBeInstanceOf(Game);
  });

  // 1라운드 게임 시작
  test('1라운드 게임 시작', () => {
    mockRandoms([4, 3]); // pobi 이동, woni 정지
    game.playGame();
    expect(roundResult).toEqual([
      { name: 'pobi', position: 1 },
      { name: 'woni', position: 0 },
    ]);
  });
});
