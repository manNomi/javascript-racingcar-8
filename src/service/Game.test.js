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

  test('빈 이름이 포함된 경우 필터링', () => {
    mockRandoms([4, 4]); // 둘 다 이동
    const game = new Game('pobi,,woni', '1'); // 중간에 빈 이름
    game.play();

    const winners = game.getWinners();
    expect(winners).toEqual(['pobi', 'woni']);
  });

  test('공백만 있는 이름이 포함된 경우 필터링', () => {
    mockRandoms([4, 4]); // 둘 다 이동
    const game = new Game('pobi, ,woni', '1'); // 중간에 공백만 있는 이름
    game.play();

    const winners = game.getWinners();
    expect(winners).toEqual(['pobi', 'woni']);
  });

  test('모든 이름이 빈 문자열인 경우 에러', () => {
    expect(() => new Game(',,,', '1')).toThrow('[ERROR]');
    expect(() => new Game('   ,   ,   ', '1')).toThrow('[ERROR]');
  });

  test('!rand 키워드로 랜덤 이름 자동차 생성', () => {
    mockRandoms([0, 0, 0, 0, 0, 0, 0, 4]); // 랜덤 이름 생성 6번 + 아이콘 1번 + 이동 1번
    const game = new Game('!rand', '1');
    game.play();

    const winners = game.getWinners();
    expect(winners).toHaveLength(1);
    expect(winners[0]).not.toBe('!rand');
  });

  test('일반 이름과 !rand 혼합 사용', () => {
    mockRandoms([0, 0, 0, 0, 0, 0, 0, 4, 4]); // 랜덤 이름 생성 6번 + 아이콘 1번 + 이동 2번
    const game = new Game('pobi,!rand', '1');
    game.play();

    const winners = game.getWinners();
    expect(winners).toHaveLength(2);
    expect(winners).toContain('pobi');
    expect(winners[1]).not.toBe('!rand');
  });
});
