import { useGameInfoQuery } from "./game_info.generated";

export const useGetGameInfo = (hltbId: string | undefined) => {
  return useGameInfoQuery({
    variables: {
      hltbId: Number(hltbId) || 0,
    },
  });
};
