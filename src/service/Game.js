import { ERROR_MESSAGE } from '../constant/message.js';
import RaceInterface from '../dto/RaceInterface.js';
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
      throw new CustomError(ERROR_MESSAGE.INVALID_CAR_NAME_NEVER_EMPTY);
    }
  }

  #validateTryCount(inputTryCount) {
    if (validate.isEmpty(inputTryCount)) {
      throw new CustomError(ERROR_MESSAGE.EMPTY_TRY_COUNT);
    }
    if (!validate.isNumber(inputTryCount)) {
      throw new CustomError(ERROR_MESSAGE.NON_NUMERIC_TRY_COUNT);
    }
    if (!validate.isInteger(inputTryCount)) {
      throw new CustomError(ERROR_MESSAGE.NON_INTEGER_TRY_COUNT);
    }
    if (!validate.isPositiveNumber(inputTryCount)) {
      throw new CustomError(ERROR_MESSAGE.NON_POSITIVE_TRY_COUNT);
    }
  }

  playGame() {
    const results = [];
    for (let i = 0; i < this.#tryCount; i += 1) {
      this.#cars.forEach((car) => car.move());
      const roundResult = this.#cars.map((car) => car.getData());
      results.push(roundResult);
    }
    return new RaceInterface(results);
  }

  getWinners() {
    const maxLocation = Math.max(...this.#cars.map((car) => car.getLocation()));
    return this.#cars
      .filter((car) => car.getLocation() === maxLocation)
      .map((car) => car.getName());
  }
}
