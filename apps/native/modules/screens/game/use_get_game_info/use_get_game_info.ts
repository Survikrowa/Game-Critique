import { useGameInfoQuery } from "./game_info.generated";

export const useGetGameInfo = (gameId: string | undefined) => {
  return useGameInfoQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    variables: {
      gameId: Number(gameId) || 0,
    },
  });
};
