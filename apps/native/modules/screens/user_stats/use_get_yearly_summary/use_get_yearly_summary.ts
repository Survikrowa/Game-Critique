import { useYearlySummaryQuery } from "./user_stats.generated";

type UseYearlySummaryArgs = {
  year: number | null;
};

export const useYearlySummary = ({ year }: UseYearlySummaryArgs) => {
  return useYearlySummaryQuery({
    variables: { year },
  });
};
