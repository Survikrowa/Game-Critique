import { useMonthlyActivityQuery } from "./user_stats.generated";

type UseMonthlyActivityArgs = {
  year: number | null;
};

export const useMonthlyActivity = ({ year }: UseMonthlyActivityArgs) => {
  return useMonthlyActivityQuery({
    variables: { year },
  });
};
