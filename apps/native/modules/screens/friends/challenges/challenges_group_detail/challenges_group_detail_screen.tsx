import { Swords } from "lucide-react-native";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";

import { ChallengeRow } from "./challenge_row/challenge_row";
import { TabButton } from "./tab_button/tab_button";
import { useChallenges } from "./use_challenges/use_challenges";
import { useLeaderboard } from "./use_leaderboard/use_leaderboard";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type TabKey = "challenges" | "leaderboard";

type ChallengesGroupDetailScreenProps = {
  groupId: number;
};

export const ChallengesGroupDetailScreen = ({
  groupId,
}: ChallengesGroupDetailScreenProps) => {
  const [tab, setTab] = useState<TabKey>("challenges");
  const challengesQuery = useChallenges(groupId);
  const leaderboardQuery = useLeaderboard(groupId);

  if (challengesQuery.loading || !challengesQuery.data) {
    return (
      <VStack className="gap-3 px-4 pt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} style={{ height: 56 }} />
        ))}
      </VStack>
    );
  }

  const challenges = challengesQuery.data.challenges;
  const leaderboard = [...(leaderboardQuery.data?.groupLeaderboard ?? [])].sort(
    (a, b) =>
      b.completedCount - a.completedCount ||
      a.forfeitedCount - b.forfeitedCount,
  );

  return (
    <View className="flex-1">
      <HStack className="justify-center gap-8 py-2">
        <TabButton
          label="Wyzwania"
          active={tab === "challenges"}
          onPress={() => setTab("challenges")}
        />
        <TabButton
          label="Leaderboard"
          active={tab === "leaderboard"}
          onPress={() => setTab("leaderboard")}
        />
      </HStack>

      {tab === "challenges" ? (
        <FlatList
          data={challenges}
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
      ) : (
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.oauthId}
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={leaderboardQuery.loading}
              onRefresh={() => leaderboardQuery.refetch()}
            />
          }
          ListEmptyComponent={<EmptyState title="Brak członków" />}
          renderItem={({ item, index }) => (
            <HStack className="justify-between px-4 py-3">
              <HStack className="items-center gap-2">
                <Text size="medium" color="primary" weight="bold">
                  {index + 1}.
                </Text>
                <Text weight="normal" size="medium" color="primary">
                  {item.name}
                </Text>
              </HStack>
              <HStack className="items-center gap-4">
                <Text weight="normal" size="small" color="primary">
                  ✓ {item.completedCount}
                </Text>
                <Text weight="normal" size="small" color="primary">
                  ✗ {item.forfeitedCount}
                </Text>
              </HStack>
            </HStack>
          )}
        />
      )}
    </View>
  );
};
