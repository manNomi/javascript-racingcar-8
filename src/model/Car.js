import { ERROR_MESSAGE } from '../constant/message.js';
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
    this.#location = 0;
    this.#icon = this.#setIcon(name);
  }

  #validateName(name) {
    if (name.length > 5) {
      throw new CustomError(ERROR_MESSAGE.INVALID_CAR_NAME_LENGTH);
    }
  }

  #getGeneratedName(name) {
    if (name.length === 0) {
      return this.#generateRandomName();
    }
    return name;
  }

  #generateRandomName() {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const patterns = ['VCCVC', 'CVCCV'];

    const pattern = patterns[getRandomInt(0, patterns.length - 1)];

    let result = '';

    for (let i = 0; i < pattern.length; i++) {
      const type = pattern[i];
      if (type === 'V') {
        result += vowels[getRandomInt(0, vowels.length - 1)];
      } else {
        result += consonants[getRandomInt(0, consonants.length - 1)];
      }
    }

    return result[0].toUpperCase() + result.slice(1);
  }

  #setIcon(name) {
    if (name === '!cat') return '🐈';
    if (name === '!coin') return '🚀';
    return '-';
  }

  move() {
    const randomValue = getRandomInt(0, 9);
    if (randomValue >= 4) {
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
