// mission-utils 모듈에 대한 타입 선언을 추가합니다.
declare module '@woowacourse/mission-utils' {
  export namespace MissionUtils {
    namespace Random {
      function pickNumberInRange(min: number, max: number): number;
    }
    namespace Console {
      function readLine(callback: (input: string) => void): void;
      function print(message: string): void;
    }
  }
}
