import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { useFriendBacklogProgress } from "./friend_stats_tab/use_friend_backlog_progress/use_friend_backlog_progress";
import { useFriendMonthlyActivity } from "./friend_stats_tab/use_friend_monthly_activity/use_friend_monthly_activity";
import { useFriendStreak } from "./friend_stats_tab/use_friend_streak/use_friend_streak";
import { useFriendYearlySummary } from "./friend_stats_tab/use_friend_yearly_summary/use_friend_yearly_summary";
import { StatsBacklogProgress } from "../user_stats/user_stats_sections/stats_backlog_progress";
import { StatsMonthlyActivity } from "../user_stats/user_stats_sections/stats_monthly_activity";
import { StatsStreak } from "../user_stats/user_stats_sections/stats_streak";
import { StatsSummaryCards } from "../user_stats/user_stats_sections/stats_summary_cards";
import { StatsYearSelector } from "../user_stats/user_stats_sections/stats_year_selector";

import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR - 2, CURRENT_YEAR - 1, CURRENT_YEAR];

export const FriendStatsTab = () => {
  const { oauth_id } = useLocalSearchParams<{ oauth_id: string }>();
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

  const yearlySummary = useFriendYearlySummary({
    oauthId: oauth_id,
    year: selectedYear,
  });
  const monthlyActivity = useFriendMonthlyActivity({
    oauthId: oauth_id,
    year: selectedYear,
  });
  const backlogProgress = useFriendBacklogProgress({
    oauthId: oauth_id,
    year: selectedYear,
  });
  const streak = useFriendStreak({ oauthId: oauth_id });

  const hasError =
    yearlySummary.error ||
    monthlyActivity.error ||
    backlogProgress.error ||
    streak.error;

  if (hasError) {
    return (
      <ErrorState
        title="Nie udało się załadować statystyk"
        description="Spróbuj ponownie za chwilę"
        onRetry={() => {
          yearlySummary.refetch();
          monthlyActivity.refetch();
          backlogProgress.refetch();
          streak.refetch();
        }}
      />
    );
  }

  const isLoaded =
    yearlySummary.data &&
    monthlyActivity.data &&
    backlogProgress.data &&
    streak.data;

  if (!isLoaded) {
    return (
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-4 py-4">
          <StatsYearSelector
            selectedYear={selectedYear}
            onYearChange={setSelectedYear}
            years={YEARS}
          />
          <View className="gap-4 px-4">
            <Skeleton style={{ height: 80, width: "100%" }} />
            <Skeleton style={{ height: 60, width: "100%" }} />
            <Skeleton style={{ height: 200, width: "100%" }} />
          </View>
        </View>
      </ScrollView>
    );
  }

  const summary = yearlySummary.data!.friendYearlySummary;
  const currentStreak = streak.data!.friendStreak;
  const monthly = monthlyActivity.data!.friendMonthlyActivity;
  const backlog = backlogProgress.data!.friendBacklogProgress;

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="gap-4 py-4">
        <StatsYearSelector
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          years={YEARS}
        />

        <StatsSummaryCards
          totalGames={summary.totalGames}
          totalHours={summary.totalHours}
          averageScore={summary.averageScore ?? null}
        />

        <StatsStreak
          currentStreak={currentStreak.currentStreak}
          longestStreak={currentStreak.longestStreak}
        />

        <StatsMonthlyActivity data={monthly} />

        <StatsBacklogProgress
          completed={backlog.completed}
          added={backlog.added}
          ratio={backlog.ratio}
        />
      </View>
    </ScrollView>
  );
};
