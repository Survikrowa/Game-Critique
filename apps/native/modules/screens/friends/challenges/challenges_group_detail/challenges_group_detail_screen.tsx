import { router } from "expo-router";
import { Plus, Swords, UserPlus } from "lucide-react-native";
import { useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

import { useDisclosure } from "@/ui/hooks/use_disclosure";

import { ChallengeListSkeleton } from "./challenge_list_skeleton/challenge_list_skeleton";
import { ChallengeRow } from "./challenge_row/challenge_row";
import { InviteMembersModal } from "./invite_members_modal/invite_members_modal";
import { LeaderboardList } from "./leaderboard_list/leaderboard_list";
import { TabBar, ChallengeGroupTab } from "./tab_bar/tab_bar";
import { useChallenges } from "./use_challenges/use_challenges";
import { useLeaderboard } from "./use_leaderboard/use_leaderboard";
import { useChallengeGroups } from "../challenges_groups/use_challenge_groups/use_challenge_groups";

import { haptic } from "@/modules/haptics/haptic";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";

type ChallengesGroupDetailScreenProps = {
  groupId: number;
};

export const ChallengesGroupDetailScreen = ({
  groupId,
}: ChallengesGroupDetailScreenProps) => {
  const { user } = useAuth0();
  const [tab, setTab] = useState<ChallengeGroupTab>("challenges");
  const { isOpen: inviteOpen, onOpen, onClose } = useDisclosure(false);
  const challengesQuery = useChallenges(groupId);
  const leaderboardQuery = useLeaderboard(groupId);
  const groupsQuery = useChallengeGroups();

  const currentGroup = groupsQuery.data?.challengeGroups.find(
    (g) => Number(g.id) === groupId,
  );
  const isOwner = user?.sub != null && user.sub === currentGroup?.ownerId;

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
            <HStack className="min-h-[44px] items-center justify-end gap-2 px-4">
              {isOwner ? (
                <Pressable
                  className="min-h-[44px] flex-row items-center gap-1 px-2"
                  onPress={onOpen}
                >
                  <UserPlus size={16} color="#3B82F6" />
                  <Text size="medium" color="blue" weight="semiBold">
                    Zaproś
                  </Text>
                </Pressable>
              ) : null}
              <Pressable
                className="min-h-[44px] flex-row items-center gap-1 px-2"
                onPress={handleCreateChallenge}
              >
                <Plus size={16} color="#3B82F6" />
                <Text size="medium" color="blue" weight="semiBold">
                  Wyzwanie
                </Text>
              </Pressable>
            </HStack>
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
        <InviteMembersModal
          groupId={groupId}
          visible={inviteOpen}
          onClose={onClose}
          existingMemberOauthIds={
            currentGroup?.members.map((member) => member.oauthId) ?? []
          }
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
