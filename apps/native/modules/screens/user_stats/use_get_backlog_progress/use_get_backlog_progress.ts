import { useBacklogProgressQuery } from "./user_stats.generated";

type UseBacklogProgressArgs = {
  year: number;
};

export const useBacklogProgress = ({ year }: UseBacklogProgressArgs) => {
  return useBacklogProgressQuery({
    variables: { year },
  });
};
