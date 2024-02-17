import { useLocalSearchParams } from "expo-router";
import { ScrollView, Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { useUserProfile } from "./use_user_profile/use_user_profile";
import { UserProfileInfoCard } from "./user_profile_info_card/user_profile_info_card";
import { GamesStatusCategoriesTabs } from "../../../games/games_status_categories_tabs/games_status_categories_tabs";
import { UserActivityCard } from "../../../user_activity/user_activity_card/user_activity_card";

export const UserProfileScreen = () => {
  const localSearchParams = useLocalSearchParams<{ oauth_id: string }>();
  console.log(localSearchParams);
  const { oauth_id } = localSearchParams;
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
        cover: activity.game?.cover?.smallUrl,
      },
    })) || [];
  const handleRefresh = async () => {
    await userProfileQuery.refetch();
  };
  return (
    <ScrollView height="100%" maxHeight="95%">
      <YStack gap={16} height="100%">
        <UserProfileInfoCard
          name={user.profile?.name}
          avatarUrl={user.profile?.avatarUrl}
          onRefreshClick={handleRefresh}
        />
        <GamesStatusCategoriesTabs oauthId={user.oauthId} />

        <YStack gap={8}>
          <Text size="extraLarge" weight="bold" color="primary">
            Aktywność
          </Text>
          <UserActivityCard activities={activities} />
        </YStack>
      </YStack>
    </ScrollView>
  );
};
