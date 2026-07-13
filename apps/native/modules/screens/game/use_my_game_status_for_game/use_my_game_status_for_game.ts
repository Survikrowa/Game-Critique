import { useMyGameStatusForGameQuery } from "./my_game_status_for_game.generated";

export const useMyGameStatusForGame = (gameId: number | undefined) => {
  return useMyGameStatusForGameQuery({
    variables: { gameId: gameId ?? 0 },
    skip: !gameId,
    fetchPolicy: "cache-and-network",
  });
};
