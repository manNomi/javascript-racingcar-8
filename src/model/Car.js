import { MissionUtils } from '@woowacourse/mission-utils';

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
      throw new Error('[ERROR]');
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
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}${randomNoun}`.slice(0, 5);
  }

  #setIcon(name) {
    if (name === '!cat') return '🐈';
    if (name === '!coin') return '🚀';
    return '-';
  }

  move() {
    const randomValue = MissionUtils.Random.pickNumberInRange(0, 9);
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
