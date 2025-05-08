import { Filter } from "@tamagui/lucide-icons";
import { Link, useLocalSearchParams } from "expo-router";
import { ScrollView, Spinner, View, XStack, YStack } from "tamagui";

import { useUserFriendGamesStatus } from "./use_user_friend_games_status/use_user_friend_games_status";
import { useUserProfile } from "./use_user_profile/use_user_profile";
import { UserProfileInfoCard } from "./user_profile_info_card/user_profile_info_card";
import { GamesStatusList } from "../../games/games_status_list/games_status_list";
import { mapGamesStatusToItem } from "../../games/games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "../../games/games_status_list_search/games_status_list_search";

export const UserProfileScreen = () => {
  const localSearchParams = useLocalSearchParams<{ oauth_id: string }>();
  const { oauth_id } = localSearchParams;
  const userProfileQuery = useUserProfile({
    oauthId: oauth_id,
  });

  const userFriendGamesStatus = useUserFriendGamesStatus({
    oauthId: userProfileQuery.data?.user?.oauthId,
  });

  const handleRefresh = async () => {
    await userProfileQuery.refetch();
  };
  const items = mapGamesStatusToItem(
    userFriendGamesStatus.data?.userFriendGamesStatus.userGamesStatus || [],
  );
  return (
    <YStack gap={16} height="100%">
      {!userProfileQuery.loading && userProfileQuery.data ? (
        <UserProfileInfoCard
          name={userProfileQuery.data.user.profile?.name}
          avatarUrl={userProfileQuery.data.user.profile?.avatarUrl}
          onRefreshClick={handleRefresh}
        />
      ) : (
        <Spinner size="large" />
      )}
      <XStack width="100%" gap={16}>
        <GamesStatusListSearch />
        <Link
          asChild
          href={`/friends/user_profile/${userProfileQuery.data?.user.oauthId}/modal`}
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
      <GamesStatusList
        onRefresh={userFriendGamesStatus.onRefresh}
        onEndReached={userFriendGamesStatus.fetchMoreGamesStatus}
        loading={userProfileQuery.loading}
        items={items}
        oauthId={userProfileQuery.data?.user.oauthId}
      />
    </YStack>
  );
};
