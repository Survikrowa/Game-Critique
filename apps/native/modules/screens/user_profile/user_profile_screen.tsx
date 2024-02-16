import { useLocalSearchParams } from "expo-router";
import { ScrollView, Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { useUserProfile } from "./use_user_profile/use_user_profile";
import { UserProfileActivityCard } from "./user_profile_activity_card/user_profile_activity_card";
import { UserProfileInfoCard } from "./user_profile_info_card/user_profile_info_card";

export const UserProfileScreen = () => {
  const { oauth_id } = useLocalSearchParams<{ oauth_id: string }>();
  const userProfileQuery = useUserProfile({
    oauthId: oauth_id,
  });

  if (userProfileQuery.loading || !userProfileQuery.data) {
    return <Spinner size="large" />;
  }
  const { user } = userProfileQuery.data;

  const activities =
    user.userActivity?.map((activity) => ({
      game: {
        name: activity.game?.name || "",
        status: activity.activityType,
        formattedUpdatedAt: activity.formattedUpdatedAt,
      },
    })) || [];
  const handleRefresh = async () => {
    await userProfileQuery.refetch();
  };
  return (
    <ScrollView height="100%" maxHeight="90%">
      <YStack gap={16} height="100%">
        <UserProfileInfoCard
          name={user.profile?.name}
          avatarUrl={user.profile?.avatarUrl}
          onRefreshClick={handleRefresh}
        />
        <YStack gap={8}>
          <Text size="extraLarge" weight="bold" color="primary">
            Aktywność
          </Text>
          <UserProfileActivityCard activities={activities} />
        </YStack>
      </YStack>
    </ScrollView>
  );
};
