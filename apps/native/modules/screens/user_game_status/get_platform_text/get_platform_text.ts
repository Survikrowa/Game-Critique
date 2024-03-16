import { GameStatus } from "../../../../__generated__/types";

export const getPlatformText = (status: GameStatus) => {
  switch (status) {
    case GameStatus.InProgress:
      return "Ogrywana na:";
    case GameStatus.Completed:
      return "Ukończona na: ";
    case GameStatus.Retired:
      return "Porzucona na:";
    default:
      return "Nieznany";
  }
};
