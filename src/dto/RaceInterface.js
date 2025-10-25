export default class RaceInterface {
  #rounds;

  constructor(rounds) {
    this.#rounds = rounds;
  }

  // Controller를 위한 간단한 인터페이스 제공
  forEachRound(callback) {
    this.#rounds.forEach((round) => {
      round.forEach(callback);
    });
  }

  getRounds() {
    return this.#rounds;
  }
}
