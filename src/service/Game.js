import Car from '../model/Car.js';
import CustomError from '../util/Error.js';
import { validate } from '../util/validate.js';

export default class Game {
  #cars;

  #tryCount;

  constructor(inputCarNames, inputTryCount) {
    this.#validateInputCarNames(inputCarNames);
    this.#validateTryCount(inputTryCount);
    this.#tryCount = Number(inputTryCount);

    const carNames = this.#splitNames(inputCarNames);
    this.#cars = carNames.map((name) => new Car(name));
  }

  #splitNames(inputCarNames) {
    return inputCarNames.split(',').map((name) => name.trim());
  }

  #validateInputCarNames(inputCarNames) {
    if (validate.isEmpty(inputCarNames)) {
      throw new CustomError('자동차 이름을 입력해야 합니다.');
    }
  }

  #validateTryCount(inputTryCount) {
    if (validate.isEmpty(inputTryCount)) {
      throw new CustomError('시도 횟수를 입력해야 합니다.');
    }
    if (!validate.isNumber(inputTryCount)) {
      throw new CustomError('시도 횟수는 숫자여야 합니다.');
    }
    if (!validate.isInteger(inputTryCount)) {
      throw new CustomError('시도 횟수는 정수여야 합니다.');
    }
    if (!validate.isPositiveNumber(inputTryCount)) {
      throw new CustomError('시도 횟수는 양수여야 합니다.');
    }
  }

  playGame() {
    const results = [];

    for (let i = 0; i < this.#tryCount; i += 1) {
      // 모든 차량 이동
      this.#cars.forEach((car) => car.move());

      // 현재 라운드 결과 수집
      const roundResult = this.#cars.map((car) => car.getData());
      results.push(roundResult);
    }

    return results; // View가 아닌 데이터 반환
  }

  getWinners() {
    const maxLocation = Math.max(
      ...this.#cars.map((car) => car.getData().location),
    );
    return this.#cars
      .filter((car) => car.getData().location === maxLocation)
      .map((car) => car.getData().name);
  }
}
