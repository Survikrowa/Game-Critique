import { useMonthlyActivityQuery } from "./user_stats.generated";

type UseMonthlyActivityArgs = {
  year: number;
};

export const useMonthlyActivity = ({ year }: UseMonthlyActivityArgs) => {
  return useMonthlyActivityQuery({
    variables: { year },
  });
};
