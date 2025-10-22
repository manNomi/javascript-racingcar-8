import { MissionUtils } from '@woowacourse/mission-utils';
import Car from '../src/model/Car.js';

// 배열에 들어간 순서대로 값을 랜덤 값을 반환하도록 mocking
const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

describe('Car 클래스 테스트', () => {
  // Car 인스턴스 생성 테스트
  test('Car 인스턴스 생성 테스트', () => {
    const carName = 'test';
    //   Car 인스턴스에는 name , location ,icon 이 존재
    const car = new Car(carName);
    expect(car).toBeInstanceOf(Car);
  });
  // Car 메소드 validate 테스트
  // 1~5자 이외의 이름이 들어올경우 에러 발생
  test('Car 메소드 validate 테스트', () => {
    const carName = 'ERROR_CAR';
    //   validate 메서드가 존재하는지 확인
    expect(new Car(carName)).toThrow();
  });

  // 0자 이름이 들어올경우 랜덤 생성기로 이름 생성
  test('Car 메소드 랜덤 이름 생성기 테스트', () => {
    const carName = '';
    //   validate 메서드가 존재하는지 확인
    const car = new Car(carName);
    expect(car.getData().name.length).toBeGreaterThan(0);
    expect(car.getData().name.length).toBeLessThan(5);
  });

  // Car move 메서드 테스트
  test('Car move 메서드 성공 테스트', () => {
    mockRandoms([4]); // 성공 케이스
    const car = new Car();
    // move 메서드가 존재하는지 확인
    car.move();
    expect(car.getData().location).toBe(1);
  });

  // Car move 메서드 테스트
  test('Car move 메서드 실패 테스트', () => {
    mockRandoms([1]); // 성공 케이스
    const car = new Car();
    // move 메서드가 존재하는지 확인
    car.move();
    expect(car.getData().location).toBe(0);
  });

  // Car move 메서드 연속 이동 테스트
  test('Car move 메서드 성공 테스트', () => {
    mockRandoms([4, 4]); // 성공 케이스
    const car = new Car();
    // move 메서드가 존재하는지 확인
    car.move();
    car.move();
    expect(car.getData().location).toBe(2);
  });

  // hidden car icon 테스트
  test('hidden car icon cat 테스트', () => {
    const carName = '!cat';
    const car = new Car(carName);
    expect(car.getData().icon).toBe('🐈');
    // icon 속성이 존재하는지 확인
  });
  test('hidden car icon coin 테스트', () => {
    const carName = '!coin';
    const car = new Car(carName);
    expect(car.getData().icon).toBe('🚀');
    // icon 속성이 존재하는지 확인
  });
});
