import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Swords } from "lucide-react-native";

import { ChallengeListSkeleton } from "./challenge_list_skeleton/challenge_list_skeleton";
import { ChallengeRow } from "./challenge_row/challenge_row";
import { LeaderboardList } from "./leaderboard_list/leaderboard_list";
import { TabBar, ChallengeGroupTab } from "./tab_bar/tab_bar";
import { useChallenges } from "./use_challenges/use_challenges";
import { useLeaderboard } from "./use_leaderboard/use_leaderboard";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";

type ChallengesGroupDetailScreenProps = {
  groupId: number;
};

export const ChallengesGroupDetailScreen = ({
  groupId,
}: ChallengesGroupDetailScreenProps) => {
  const [tab, setTab] = useState<ChallengeGroupTab>("challenges");
  const challengesQuery = useChallenges(groupId);
  const leaderboardQuery = useLeaderboard(groupId);

  if (
    tab === "challenges" &&
    (challengesQuery.loading || !challengesQuery.data)
  ) {
    return (
      <View className="flex-1">
        <TabBar tab={tab} onChange={setTab} />
        <ChallengeListSkeleton />
      </View>
    );
  }

  if (tab === "challenges") {
    return (
      <View className="flex-1">
        <TabBar tab={tab} onChange={setTab} />
        <FlatList
          data={challengesQuery.data?.challenges}
          keyExtractor={(item) => String(item.id)}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={challengesQuery.loading}
              onRefresh={() => challengesQuery.refetch()}
            />
          }
          ListEmptyComponent={
            <EmptyState
              title="Brak wyzwań w tej grupie"
              description="Rzuć pierwsze wyzwanie"
              icon={<Swords size={32} color="#3B82F6" />}
            />
          }
          renderItem={({ item }) => <ChallengeRow challenge={item} />}
        />
      </View>
    );
  }

  const leaderboard = [...(leaderboardQuery.data?.groupLeaderboard ?? [])].sort(
    (a, b) =>
      b.completedCount - a.completedCount ||
      a.forfeitedCount - b.forfeitedCount,
  );

  return (
    <View className="flex-1">
      <TabBar tab={tab} onChange={setTab} />
      <LeaderboardList
        entries={leaderboard}
        loading={leaderboardQuery.loading}
        onRefresh={() => leaderboardQuery.refetch()}
      />
    </View>
  );
};
