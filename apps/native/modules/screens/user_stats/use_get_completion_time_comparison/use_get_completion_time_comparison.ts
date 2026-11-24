import { useCompletionTimeComparisonQuery } from "./user_stats.generated";

type UseCompletionTimeComparisonArgs = {
  gameStatusId?: number;
};

export const useCompletionTimeComparison = ({
  gameStatusId,
}: UseCompletionTimeComparisonArgs) => {
  return useCompletionTimeComparisonQuery({
    variables: { gameStatusId: gameStatusId || 0 },
    skip: !gameStatusId,
  });
};
