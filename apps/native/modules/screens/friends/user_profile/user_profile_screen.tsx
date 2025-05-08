import { Filter } from "@tamagui/lucide-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, Spinner, View, XStack, YStack } from "tamagui";

import { useUserProfile } from "./use_user_profile/use_user_profile";
import { UserProfileInfoCard } from "./user_profile_info_card/user_profile_info_card";
import { GamesStatusList } from "../../games/games_status_list/games_status_list";
import { GamesStatusListSearch } from "../../games/games_status_list_search/games_status_list_search";

export const UserProfileScreen = () => {
  const localSearchParams = useLocalSearchParams<{ oauth_id: string }>();
  const { oauth_id } = localSearchParams;
  const userProfileQuery = useUserProfile({
    oauthId: oauth_id,
  });

  if (userProfileQuery.loading || !userProfileQuery.data) {
    return <Spinner size="large" />;
  }
  const { user } = userProfileQuery.data;

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
        <XStack width="100%" gap={16}>
          <GamesStatusListSearch />
          <Link
            asChild
            href={`/friends/user_profile/${userProfileQuery.data.user.oauthId}/modal`}
          >
            <View
              style={{
                maxWidth: 42,
                borderRadius: 8,
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flex: 1,
                backgroundColor: "white",
                borderColor: "black",
              }}
            >
              <Filter height="100%" width="100%" />
            </View>
          </Link>
        </XStack>
        <GamesStatusList />
      </YStack>
    </ScrollView>
  );
};
