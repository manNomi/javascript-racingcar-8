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
      throw new CustomError('자동차 이름은 5자 이하이어야 합니다.');
    }
  }

  #getGeneratedName(name) {
    if (name.length === 0) {
      return this.#generateRandomName();
    }
    return name;
  }

  #generateRandomName() {
    const adjectives = ['Fast', 'Red', 'Cool', 'Sly', 'Bold'];
    const nouns = ['Tiger', 'Eagle', 'Shark', 'Pant', 'Wolf'];
    const randomAdjective =
      adjectives[Math.floor(getRandomInt(0, adjectives.length - 1))];
    const randomNoun = nouns[getRandomInt(0, nouns.length - 1)];
    return `${randomAdjective}${randomNoun}`.slice(0, 5);
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
}
