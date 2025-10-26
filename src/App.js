import { INPUT_MESSAGE, OUTPUT_MESSAGE } from './constant/message.js';
import Game from './service/Game.js';
import inputView from './view/InputView.js';
import outputView from './view/OutputView.js';

class App {
  async run() {
    const { inputText, tryCount } = await this.#inputMessages();
    const game = new Game(inputText, tryCount);
    const results = game.play();
    this.#outputMessages(results, game.getWinners());
  }

  async #inputMessages() {
    const inputText = await inputView.readLineMessage(INPUT_MESSAGE.CAR_NAME);
    const tryCount = await inputView.readLineMessage(INPUT_MESSAGE.TRY_COUNT);
    return { inputText, tryCount };
  }

  #outputMessages(results, winners) {
    results.forEach((round) => {
      round.forEach(({ name, icon, location }) => {
        outputView.printMessage(
          OUTPUT_MESSAGE.ROUND_RESULT(name, icon, location),
        );
      });
    });

    outputView.printMessage(OUTPUT_MESSAGE.FINAL_WINNER(winners));
  }
}

export default App;
