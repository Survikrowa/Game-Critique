import { ChevronRight, Users } from "lucide-react-native";
import { Pressable, View } from "react-native";

import { haptic } from "@/modules/haptics/haptic";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

import type { ChallengeGroupsQuery } from "../use_challenge_groups/challenge_groups.query.generated";

type ChallengeGroup = ChallengeGroupsQuery["challengeGroups"][number];

type ChallengeGroupCardProps = {
  group: ChallengeGroup;
  onPress: () => void;
};

export const ChallengeGroupCard = ({
  group,
  onPress,
}: ChallengeGroupCardProps) => {
  const activeMemberCount = group.members.filter(
    (member) => member.status === "ACTIVE",
  ).length;
  const memberLabel =
    activeMemberCount === 1 ? "1 członek" : `${activeMemberCount} członków`;

  return (
    <Pressable
      className="min-h-[44px] flex-row items-center justify-between rounded-2xl bg-background-0 px-4 py-3 shadow-sm"
      onPress={() => {
        haptic.light();
        onPress();
      }}
    >
      <HStack className="flex-1 items-center gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
          <Users size={18} color="#3B82F6" />
        </View>
        <VStack className="flex-1 gap-0.5">
          <Text size="medium" color="primary" weight="semiBold">
            {group.name}
          </Text>
          <Text size="small" color="secondary" weight="normal">
            {memberLabel}
          </Text>
        </VStack>
      </HStack>
      <ChevronRight size={18} color="#64748B" />
    </Pressable>
  );
};
