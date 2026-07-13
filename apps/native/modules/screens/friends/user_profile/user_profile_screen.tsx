import { Link, useLocalSearchParams } from "expo-router";
import { Filter } from "lucide-react-native";
import { ActivityIndicator } from "react-native";

import { FriendGamesStatusList } from "./friend_games_status_list/friend_games_status_list";
import { useUserFriendGamesStatus } from "./use_user_friend_games_status/use_user_friend_games_status";
import { useUserProfile } from "./use_user_profile/use_user_profile";
import { UserProfileInfoCard } from "./user_profile_info_card/user_profile_info_card";
import { mapGamesStatusToItem } from "../../games/games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "../../games/games_status_list_search/games_status_list_search";

import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

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
    <VStack className="gap-4 h-full">
      {!userProfileQuery.loading && userProfileQuery.data ? (
        <UserProfileInfoCard
          name={userProfileQuery.data.user.profile?.name}
          avatarUrl={userProfileQuery.data.user.profile?.avatarUrl}
          onRefreshClick={handleRefresh}
        />
      ) : (
        <ActivityIndicator size="large" color="#3B82F6" />
      )}
      <HStack className="w-full gap-3 items-center">
        <GamesStatusListSearch />
        <Link
          asChild
          href={`/friends/user_profile/${userProfileQuery.data?.user.oauthId}/modal`}
        >
          <ButtonWithIcon
            action="primary"
            className="w-[44px] h-[44px]"
            onPress={() => {}}
            icon={<Filter size={20} color="#ffffff" />}
          />
        </Link>
      </HStack>
      <FriendGamesStatusList
        oauthId={userProfileQuery.data?.user.oauthId || ""}
        onRefresh={userFriendGamesStatus.onRefresh}
        onEndReached={userFriendGamesStatus.fetchMoreGamesStatus}
        loading={userProfileQuery.loading}
        items={items}
      />
    </VStack>
  );
};
