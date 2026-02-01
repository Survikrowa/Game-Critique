import { GameStatus } from "@/__generated__/types";

export const mapGameStatusToLabel = (status: GameStatus) => {
  switch (status) {
    case "BACKLOG":
      return "Backlog";
    case "COMPLETED":
      return "Ukończona";
    case "IN_PROGRESS":
      return "W trakcie";
    case "RETIRED":
      return "Porzucona";
    default:
      return "Nieznany status";
  }
};
