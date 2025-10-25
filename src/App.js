import { INPUT_MESSAGE, OUTPUT_MESSAGE } from './constant/message.js';
import Game from './service/Game.js';
import inputView from './view/InputView.js';
import outputView from './view/OutputView.js';

class App {
  async run() {
    const inputText = await inputView.readLineMessage(INPUT_MESSAGE.CAR_NAME);
    const tryCount = await inputView.readLineMessage(INPUT_MESSAGE.TRY_COUNT);
    const game = new Game(inputText, tryCount);
    const raceInterface = game.playGame();

    // DTO가 내부 구조를 숨겨줌
    raceInterface.forEachRound((carData) => {
      outputView.printMessage(OUTPUT_MESSAGE.ROUND_RESULT(...carData));
    });
    const winners = game.getWinners();
    outputView.printMessage(OUTPUT_MESSAGE.FINAL_WINNER(winners));
  }
}

export default App;
