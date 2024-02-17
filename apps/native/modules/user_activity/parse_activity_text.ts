import { GameStatus } from "../../__generated__/types";

export const parseStatus = (gameStatus: GameStatus) => {
  switch (gameStatus) {
    case GameStatus.Completed:
      return "ukończonych";
    case GameStatus.Retired:
      return "porzuconych";
    case GameStatus.InProgress:
      return "ogrywanych";
    default:
      return "";
  }
};
