import { FlatList, RefreshControl } from "react-native";

import { GroupLeaderboardQuery } from "../use_leaderboard/leaderboard.query.generated";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";

type LeaderboardEntry = GroupLeaderboardQuery["groupLeaderboard"][number];

type LeaderboardListProps = {
  entries: LeaderboardEntry[];
  loading: boolean;
  onRefresh: () => void;
};

export const LeaderboardList = ({
  entries,
  loading,
  onRefresh,
}: LeaderboardListProps) => (
  <FlatList
    data={entries}
    keyExtractor={(item) => item.oauthId}
    className="flex-1"
    contentContainerStyle={{ flexGrow: 1 }}
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={onRefresh} />
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
);
