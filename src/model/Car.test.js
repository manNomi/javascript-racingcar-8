import { MissionUtils } from '@woowacourse/mission-utils';
import Car from './Car.js';

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
    expect(() => new Car(carName)).toThrow('[ERROR]');
  });

  // 0자 이름이 들어올경우 랜덤 생성기로 이름 생성
  test('Car 메소드 랜덤 이름 생성기 테스트', () => {
    //   validate 메서드가 존재하는지 확인
    const car = new Car();
    expect(car.getData().name.length).toBeGreaterThan(0);
    expect(car.getData().name.length).toBeLessThan(6);
  });

  // Car move 메서드 테스트
  test('Car move 메서드 성공 테스트', () => {
    mockRandoms([4]); // 성공 케이스
    const car = new Car('test');
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
    const car = new Car('test');
    // move 메서드가 존재하는지 확인
    car.move();
    car.move();
    expect(car.getData().location).toBe(2);
  });

  // !rand 키워드로 랜덤 이름 생성 테스트
  test('!rand 키워드로 랜덤 이름 생성 테스트', () => {
    // pattern 선택 1번 + 각 글자 5번 + 아이콘 선택 1번 = 총 7번의 랜덤 호출
    mockRandoms([0, 0, 0, 0, 0, 0, 0]);
    const car = new Car('!rand');
    expect(car.getData().name).not.toBe('!rand');
    expect(car.getData().name.length).toBeGreaterThan(0);
  });

  // !rand 키워드는 특수 키워드로 인식되어 랜덤 이름 생성
  test('!rand 키워드는 특수 키워드로 인식되어 랜덤 이름 생성', () => {
    // pattern 선택 1번 + 각 글자 5번 + 아이콘 선택 1번 = 총 7번의 랜덤 호출
    mockRandoms([0, 0, 0, 0, 0, 0, 0]);
    const car = new Car('!rand');
    expect(car.getData().name).not.toBe('!rand');
  });

  // !rand 키워드로 랜덤 아이콘 생성 테스트
  test('!rand 키워드로 랜덤 아이콘 생성 테스트 - 🐈', () => {
    // pattern 선택 1번 + 각 글자 5번 + 아이콘 선택(0=🐈) 1번
    mockRandoms([0, 0, 0, 0, 0, 0, 0]);
    const car = new Car('!rand');
    expect(car.getData().icon).toBe('🐈');
  });

  test('!rand 키워드로 랜덤 아이콘 생성 테스트 - 🚀', () => {
    // pattern 선택 1번 + 각 글자 5번 + 아이콘 선택(1=🚀) 1번
    mockRandoms([0, 0, 0, 0, 0, 0, 1]);
    const car = new Car('!rand');
    expect(car.getData().icon).toBe('🚀');
  });

  test('!rand 키워드로 랜덤 아이콘 생성 테스트 - 기본 아이콘', () => {
    // pattern 선택 1번 + 각 글자 5번 + 아이콘 선택(2=-) 1번
    mockRandoms([0, 0, 0, 0, 0, 0, 2]);
    const car = new Car('!rand');
    expect(car.getData().icon).toBe('-');
  });

  // 일반 이름은 기본 아이콘 사용
  test('일반 이름은 기본 아이콘(-) 사용', () => {
    const car = new Car('pobi');
    expect(car.getData().icon).toBe('-');
  });
});
