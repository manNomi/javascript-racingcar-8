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
    for (let i = 0; i < this.#tryCount; i += 1) {
      this.#cars.forEach((car) => {
        car.move();
      });
    }
  }
}
