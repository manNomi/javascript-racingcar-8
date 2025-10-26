import { ERROR_MESSAGE } from '../constant/message.js';
import {
  CAR_CONFIG,
  RANDOM_NAME_GENERATOR,
  RANDOM_ICONS,
} from '../constant/car.js';
import CustomError from '../util/Error.js';
import { getRandomInt } from '../util/random.js';

export default class Car {
  #name;

  #location;

  #icon;

  constructor(name = '') {
    const trimdName = name.trim();
    this.#validateName(trimdName);
    this.#name = this.#getGeneratedName(trimdName);
    this.#location = CAR_CONFIG.INITIAL_LOCATION;
    this.#icon = this.#getIcon(trimdName);
  }

  #validateName(name) {
    if (
      name.length > CAR_CONFIG.MAX_NAME_LENGTH &&
      name !== CAR_CONFIG.RANDOM_NAME_KEYWORD
    ) {
      throw new CustomError(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
    }
  }

  #getGeneratedName(name) {
    if (name.length === 0 || name === CAR_CONFIG.RANDOM_NAME_KEYWORD) {
      return this.#generateRandomName();
    }
    return name;
  }

  #generateRandomName() {
    const { VOWELS, CONSONANTS, PATTERNS, V } = RANDOM_NAME_GENERATOR;
    const pattern = PATTERNS[getRandomInt(0, PATTERNS.length - 1)];

    let result = '';

    for (let i = 0; i < pattern.length; i += 1) {
      const type = pattern[i];
      if (type === V) {
        result += VOWELS[getRandomInt(0, VOWELS.length - 1)];
      } else {
        result += CONSONANTS[getRandomInt(0, CONSONANTS.length - 1)];
      }
    }

    return result[0].toUpperCase() + result.slice(1);
  }

  #getIcon(name) {
    if (name === CAR_CONFIG.RANDOM_NAME_KEYWORD || name.length === 0) {
      return this.#generateRandomIcon();
    }
    return CAR_CONFIG.DEFAULT_ICON;
  }

  #generateRandomIcon() {
    const randomIndex = getRandomInt(0, RANDOM_ICONS.length - 1);
    return RANDOM_ICONS[randomIndex];
  }

  move() {
    const randomValue = getRandomInt();
    if (randomValue >= CAR_CONFIG.MOVE_THRESHOLD) {
      this.#location += 1;
    }
  }

  getData() {
    return {
      name: this.#name,
      location: this.#location,
      icon: this.#icon,
    };
  }

  getLocation() {
    return this.#location;
  }

  getName() {
    return this.#name;
  }
}
