import { useBacklogProgressQuery } from "./user_stats.generated";

type UseBacklogProgressArgs = {
  year: number | null;
};

export const useBacklogProgress = ({ year }: UseBacklogProgressArgs) => {
  return useBacklogProgressQuery({
    variables: { year },
  });
};
