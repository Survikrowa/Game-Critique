import { useYearlySummaryQuery } from "./user_stats.generated";

type UseYearlySummaryArgs = {
  year: number;
};

export const useYearlySummary = ({ year }: UseYearlySummaryArgs) => {
  return useYearlySummaryQuery({
    variables: { year },
  });
};
