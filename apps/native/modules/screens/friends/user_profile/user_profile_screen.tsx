import { Filter } from "lucide-react-native";
import { ActivityIndicator, Pressable } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

import { useUserFriendGamesStatus } from "./use_user_friend_games_status/use_user_friend_games_status";
import { useUserProfile } from "./use_user_profile/use_user_profile";
import { UserProfileInfoCard } from "./user_profile_info_card/user_profile_info_card";
import { GamesStatusList } from "../../games/games_status_list/games_status_list";
import { mapGamesStatusToItem } from "../../games/games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "../../games/games_status_list_search/games_status_list_search";

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
      <HStack className="w-full gap-4">
        <GamesStatusListSearch />
        <Link
          asChild
          href={`/friends/user_profile/${userProfileQuery.data?.user.oauthId}/modal`}
        >
          <Pressable className="max-w-[42px] rounded-lg items-center justify-center flex-1 bg-primary-500 min-h-[44px]">
            <Filter size={20} color="#ffffff" />
          </Pressable>
        </Link>
      </HStack>
      <GamesStatusList
        onRefresh={userFriendGamesStatus.onRefresh}
        onEndReached={userFriendGamesStatus.fetchMoreGamesStatus}
        loading={userProfileQuery.loading}
        items={items}
        oauthId={userProfileQuery.data?.user.oauthId}
      />
    </VStack>
  );
};
