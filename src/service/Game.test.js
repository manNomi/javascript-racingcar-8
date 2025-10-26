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
  test('Game 객체 생성', () => {
    const game = new Game('pobi,woni', '1');
    expect(game).toBeInstanceOf(Game);
  });

  test('1라운드 게임 결과 반환', () => {
    mockRandoms([4, 3]); // pobi 이동, woni 정지
    const game = new Game('pobi,woni', '1');
    const results = game.play();

    expect(results).toHaveLength(1); // 1라운드
    expect(results[0]).toHaveLength(2); // 2대의 차량
    expect(results[0][0]).toEqual({ name: 'pobi', location: 1, icon: '-' });
    expect(results[0][1]).toEqual({ name: 'woni', location: 0, icon: '-' });
  });

  test('우승자 1명 반환', () => {
    mockRandoms([4, 3]); // pobi 이동, woni 정지
    const game = new Game('pobi,woni', '1');
    game.play();

    const winners = game.getWinners();
    expect(winners).toEqual(['pobi']);
  });

  test('공동 우승자 반환', () => {
    mockRandoms([4, 4]); // 둘 다 이동
    const game = new Game('pobi,woni', '1');
    game.play();

    const winners = game.getWinners();
    expect(winners).toEqual(['pobi', 'woni']);
  });

  test('유효하지 않은 시도 횟수로 생성 시 에러', () => {
    expect(() => new Game('pobi,woni', '0')).toThrow('[ERROR]');
    expect(() => new Game('pobi,woni', 'abc')).toThrow('[ERROR]');
  });
});
