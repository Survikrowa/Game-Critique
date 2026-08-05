import { StatsSummaryCards } from "./stats_summary_cards";
import type { YearlySummaryQuery } from "../use_get_yearly_summary/user_stats.generated";

type StatsSummaryYearProps = {
  summary: YearlySummaryQuery["yearlySummary"];
  selectedYear: number | null;
};

export const StatsSummaryYear = ({
  summary,
  selectedYear,
}: StatsSummaryYearProps) => {
  const isAllTime = selectedYear === null;
  return (
    <StatsSummaryCards
      totalGames={
        isAllTime ? summary.totalGames ?? 0 : summary.yearlyGames ?? 0
      }
      totalHours={
        isAllTime ? summary.totalHours ?? 0 : summary.yearlyHours ?? 0
      }
      averageScore={
        isAllTime
          ? summary.averageScore ?? null
          : summary.yearlyAverageScore ?? null
      }
    />
  );
};
