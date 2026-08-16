import { router } from "expo-router";
import { Plus, Swords } from "lucide-react-native";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { ChallengeListSkeleton } from "./challenge_list_skeleton/challenge_list_skeleton";
import { ChallengeRow } from "./challenge_row/challenge_row";
import { LeaderboardList } from "./leaderboard_list/leaderboard_list";
import { TabBar, ChallengeGroupTab } from "./tab_bar/tab_bar";
import { useChallenges } from "./use_challenges/use_challenges";
import { useLeaderboard } from "./use_leaderboard/use_leaderboard";

import { haptic } from "@/modules/haptics/haptic";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type ChallengesGroupDetailScreenProps = {
  groupId: number;
};

export const ChallengesGroupDetailScreen = ({
  groupId,
}: ChallengesGroupDetailScreenProps) => {
  const [tab, setTab] = useState<ChallengeGroupTab>("challenges");
  const challengesQuery = useChallenges(groupId);
  const leaderboardQuery = useLeaderboard(groupId);

  const handleCreateChallenge = () => {
    haptic.light();
    router.push({
      pathname: "/friends/challenges/create_challenge",
      params: { groupId },
    });
  };

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
          ListHeaderComponent={
            <Pressable
              className="min-h-[44px] flex-row items-center justify-end gap-1 px-4"
              onPress={handleCreateChallenge}
            >
              <Plus size={16} color="#3B82F6" />
              <Text size="medium" color="blue" weight="semiBold">
                Wyzwanie
              </Text>
            </Pressable>
          }
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
