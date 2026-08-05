import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";

import { useBacklogProgress } from "./use_get_backlog_progress/use_get_backlog_progress";
import { useMonthlyActivity } from "./use_get_monthly_activity/use_get_monthly_activity";
import { useStreak } from "./use_get_streak/use_get_streak";
import { useGetUserStats } from "./use_get_user_stats/use_get_user_stats";
import { useYearlySummary } from "./use_get_yearly_summary/use_get_yearly_summary";
import { StatsBacklogProgress } from "./user_stats_sections/stats_backlog_progress";
import { StatsMonthlyActivity } from "./user_stats_sections/stats_monthly_activity";
import { StatsStreak } from "./user_stats_sections/stats_streak";
import { StatsSummaryYear } from "./user_stats_sections/stats_summary_year";
import { StatsYearSelector } from "./user_stats_sections/stats_year_selector";

import { BarChart } from "@/ui/data-display/bar-chart/bar-chart";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Text } from "@/ui/typography/text";

const CURRENT_YEAR = 2026;
const AVAILABLE_YEARS = [2024, 2025, 2026];

const tabItemStyle = tva({
  base: "px-3 py-2 min-h-[44px] justify-center items-center",
  variants: {
    active: {
      true: "bg-background-100",
      false: "bg-transparent",
    },
  },
});

const selectData = [
  { name: "Platformy", value: "platforms" },
  { name: "Oceny", value: "ratings" },
  { name: "Rok wydania", value: "release_year" },
];

export const UserStatsScreen = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(CURRENT_YEAR);
  const [selectedChart, setSelectedChart] = useState("ratings");

  const yearlySummary = useYearlySummary({ year: selectedYear ?? null });
  const monthlyActivity = useMonthlyActivity({ year: selectedYear ?? null });
  const backlogProgress = useBacklogProgress({ year: selectedYear ?? null });
  const streak = useStreak();
  const chartData = useGetUserStats({ type: selectedChart });

  const hasError =
    yearlySummary.error ||
    monthlyActivity.error ||
    backlogProgress.error ||
    streak.error ||
    chartData.error;

  if (hasError) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text size="large" weight="bold" color="primary">
          Nie udało się załadować statystyk
        </Text>
        <View className="mt-4">
          <Text size="medium" weight="normal" color="secondary">
            Spróbuj ponownie za chwilę
          </Text>
        </View>
      </View>
    );
  }

  const isLoaded =
    yearlySummary.data &&
    monthlyActivity.data &&
    backlogProgress.data &&
    streak.data;

  const summary = yearlySummary.data?.yearlySummary;
  const streakData = streak.data?.streak;
  const monthlyData = monthlyActivity.data?.monthlyActivity;
  const backlogData = backlogProgress.data?.backlogProgress;

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="gap-4 py-4">
        <StatsYearSelector
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={AVAILABLE_YEARS}
        />

        {isLoaded && summary && streakData && monthlyData && backlogData ? (
          <>
            <StatsSummaryYear summary={summary} selectedYear={selectedYear} />

            <StatsStreak
              currentStreak={streakData.currentStreak}
              longestStreak={streakData.longestStreak}
            />

            <StatsMonthlyActivity data={monthlyData} />

            <View className="mx-4 rounded-2xl bg-background-50 p-4">
              <Text size="large" weight="bold" color="primary">
                {selectedChart === "platforms"
                  ? "Top platformy"
                  : selectedChart === "ratings"
                    ? "Rozkład ocen"
                    : "Rok wydania"}
              </Text>
              <View className="mt-3">
                <BarChart
                  showScrollIndicator
                  labelsExtraHeight={30}
                  labelWidth={130}
                  showValuesAsTopLabel
                  horizontal
                  topLabelContainerStyle={{
                    width: 40,
                    marginLeft: -10,
                    marginTop: -10,
                  }}
                  topLabelTextStyle={{
                    color: "white",
                    fontSize: 12,
                    fontWeight: "normal",
                  }}
                  data={chartData.data?.userStats || []}
                  barWidth={18}
                  height={200}
                  width={240}
                  showGradient
                  noOfSections={4}
                  yAxisTextStyle={{ color: "gray" }}
                  isAnimated
                  animationDuration={300}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  xAxisLabelTextStyle={{
                    alignSelf: "flex-start",
                    marginRight: 40,
                    marginTop: -44,
                    color: "white",
                  }}
                  renderTooltip={(item: { label: string; value: number }) => (
                    <View className="border-white bg-black mb-2.5 rounded-sm border p-1">
                      <Text size="small" weight="normal" color="primary">
                        {item.label}
                      </Text>
                    </View>
                  )}
                />
              </View>
            </View>

            <View className="items-center">
              <View className="overflow-hidden rounded-lg border border-outline-0">
                <View className="flex-row">
                  {selectData.map((item) => (
                    <Pressable
                      key={item.value}
                      onPress={() => setSelectedChart(item.value)}
                      className={tabItemStyle({
                        active: selectedChart === item.value,
                      })}
                    >
                      <Text size="small" weight="normal" color="primary">
                        {item.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            <StatsBacklogProgress
              completed={backlogData.completed}
              added={backlogData.added}
              ratio={backlogData.ratio}
            />

            <View className="h-8" />
          </>
        ) : (
          <View className="gap-4 px-4">
            <Skeleton style={{ height: 80, width: "100%" }} />
            <Skeleton style={{ height: 60, width: "100%" }} />
            <Skeleton style={{ height: 200, width: "100%" }} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};
