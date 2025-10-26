import { ERROR_MESSAGE } from '../constant/message.js';
import Car from '../model/Car.js';
import CustomError from '../util/Error.js';
import { validate } from '../util/validate.js';
import { GAME_CONFIG } from '../constant/game.js';

export default class Game {
  #cars;

  #roundCount;

  constructor(carNames, roundCount) {
    this.#cars = this.#createCars(carNames);
    this.#validateRoundCountInput(roundCount);
    this.#roundCount = Number(roundCount);
  }

  #createCars(carNamesInput) {
    this.#validatecarNamesInput(carNamesInput);

    const names = carNamesInput
      .split(GAME_CONFIG.NAME_DELIMITER)
      .map((name) => name.trim());

    this.#validateDuplicateCarNames(names);
    return names.map((name) => new Car(name));
  }

  #validatecarNamesInput(carNames) {
    if (validate.isEmpty(carNames)) {
      throw new CustomError(ERROR_MESSAGE.INVALID_CAR_NAME_NEVER_EMPTY);
    }
  }

  #validateDuplicateCarNames(carNames) {
    if (validate.isDuplicate(carNames)) {
      throw new CustomError(ERROR_MESSAGE.INVALID_CAR_NAME_DUPLICATE);
    }
  }

  #validateRoundCountInput(inputTryCount) {
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

  play() {
    const results = [];

    for (let round = 0; round < this.#roundCount; round += 1) {
      this.#cars.forEach((car) => car.move());

      results.push(this.#cars.map((car) => car.getData()));
    }

    return results;
  }

  getWinners() {
    const maxPosition = this.#findMaxPosition();
    return this.#filterWinnersByPosition(maxPosition);
  }

  #findMaxPosition() {
    return Math.max(...this.#cars.map((car) => car.getLocation()));
  }

  #filterWinnersByPosition(targetPosition) {
    return this.#cars
      .filter((car) => car.getLocation() === targetPosition)
      .map((car) => car.getName());
  }
}
