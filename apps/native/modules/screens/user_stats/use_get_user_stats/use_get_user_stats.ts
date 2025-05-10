import { useUserStatsQuery } from "./user_stats.generated";

type UseGetUserStatsArgs = {
  type: string;
};

export const useGetUserStats = ({ type }: UseGetUserStatsArgs) => {
  return useUserStatsQuery({
    variables: {
      type,
    },
  });
};
