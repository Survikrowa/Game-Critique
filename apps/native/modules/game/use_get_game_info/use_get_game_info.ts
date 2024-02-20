import { useGameInfoQuery } from "./game_info.generated";

export const useGetGameInfo = (hltbId: string | undefined) => {
  return useGameInfoQuery({
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    variables: {
      hltbId: Number(hltbId) || 0,
    },
  });
};
