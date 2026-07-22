import { useHltbComparisonQuery } from "./user_stats.generated";

type UseHltbComparisonArgs = {
  gameStatusId: number;
};

export const useHltbComparison = ({ gameStatusId }: UseHltbComparisonArgs) => {
  return useHltbComparisonQuery({
    variables: { gameStatusId },
  });
};
