import Car from '../model/Car.js';

export default class Game {
  #cars;

  #tryCount;

  constructor(inputCarNames, inputTryCount) {
    const carNames = this.#splitNames(inputCarNames);
    this.#cars = carNames.map((name) => new Car(name));

    this.#validateTryCount(inputTryCount);
    this.#tryCount = Number(inputTryCount);
  }

  #splitNames(inputCarNames) {
    return inputCarNames.split(',').map((name) => name.trim());
  }

  #validateTryCount(inputTryCount) {
    const numberdInputTryCount = Number(inputTryCount);
    if (
      Number.isNaN(numberdInputTryCount) ||
      !Number.isInteger(numberdInputTryCount) ||
      numberdInputTryCount <= 0
    ) {
      throw new Error('[ERROR]');
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
