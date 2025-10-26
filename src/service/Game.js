import { ERROR_MESSAGE } from '../constant/message.js';
import RaceInterface from '../dto/RaceInterface.js';
import Car from '../model/Car.js';
import CustomError from '../util/Error.js';
import { validate } from '../util/validate.js';
import { GAME_CONFIG } from '../constant/game.js';

export default class Game {
  #cars;

  #roundCount;

  constructor(carNames, roundCount) {
    this.#cars = this.#createCars(carNames);
    this.#roundCount = this.#validateAndParseRoundCount(roundCount);
  }

  #createCars(carNames) {
    this.#validateCarNames(carNames);
    const names = this.#parseCarNames(carNames);
    return names.map((name) => new Car(name));
  }

  #parseCarNames(input) {
    return input.split(GAME_CONFIG.NAME_DELIMITER).map((name) => name.trim());
  }

  #validateCarNames(carNames) {
    if (validate.isEmpty(carNames)) {
      throw new CustomError(ERROR_MESSAGE.INVALID_CAR_NAME_NEVER_EMPTY);
    }
  }

  #validateAndParseRoundCount(input) {
    this.#validateRoundCountInput(input);
    return Number(input);
  }

  #validateRoundCountInput(input) {
    if (validate.isEmpty(input)) {
      throw new CustomError(ERROR_MESSAGE.EMPTY_TRY_COUNT);
    }
    if (!validate.isNumber(input)) {
      throw new CustomError(ERROR_MESSAGE.NON_NUMERIC_TRY_COUNT);
    }
    if (!validate.isInteger(input)) {
      throw new CustomError(ERROR_MESSAGE.NON_INTEGER_TRY_COUNT);
    }
    if (!validate.isPositiveNumber(input)) {
      throw new CustomError(ERROR_MESSAGE.NON_POSITIVE_TRY_COUNT);
    }
  }

  play() {
    const raceHistory = [];

    for (let round = 0; round < this.#roundCount; round += 1) {
      this.#executeRound();
      raceHistory.push(this.#getCurrentRoundStatus());
    }

    return new RaceInterface(raceHistory);
  }

  #executeRound() {
    this.#cars.forEach((car) => car.move());
  }

  #getCurrentRoundStatus() {
    return this.#cars.map((car) => car.getData());
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
