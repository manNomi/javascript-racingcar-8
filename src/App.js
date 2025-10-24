import Game from './service/Game.js';
import inputView from './view/InputView.js';
import outputView from './view/OutputView.js';

class App {
  async run() {
    const inputText = await inputView.readLineMessage(
      '게임에 참여할 자동차 이름을 입력하세요(이름은 쉼표(,) 기준으로 구분)',
    );
    const tryCount =
      await inputView.readLineMessage('시도할 회수는 몇회인가요?');
    const game = new Game(inputText, tryCount);
    const result = game.playGame();
    result.forEach((round) => {
      round.forEach((data) => {
        const { name, location, icon } = data;
        outputView.printMessage(`${name} : ${icon.repeat(location)}`);
      });
    });
    const winners = game.getWinners();
    outputView.printMessage(`최종 우승자 : ${winners.join(', ')}`);
  }
}

export default App;
