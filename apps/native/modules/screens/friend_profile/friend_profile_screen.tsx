import { Link, useLocalSearchParams } from "expo-router";
import { Filter } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { FriendActivityTab } from "./friend_activity_tab";
import { FriendProfileHeader } from "./friend_profile_header";
import { FriendProfileTabs } from "./friend_profile_tabs";
import { FriendStatsTab } from "./friend_stats_tab";
import { FriendGamesStatusListItem } from "../friends/user_profile/friend_games_status_list/friend_games_status_list_item/friend_games_status_list_item";
import { useUserFriendGamesStatus } from "../friends/user_profile/use_user_friend_games_status/use_user_friend_games_status";
import { useUserProfile } from "../friends/user_profile/use_user_profile/use_user_profile";
import { GamesStatusGrid } from "../games/games_status_list/games_status_grid/games_status_grid";
import { mapGamesStatusToItem } from "../games/games_status_list/map_games_status_to_item";
import { GamesStatusListSearch } from "../games/games_status_list_search/games_status_list_search";

import { ButtonWithIcon } from "@/ui/forms/button_icon";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

type TabId = "games" | "stats" | "activity";

export const FriendProfileScreen = () => {
  const { oauth_id } = useLocalSearchParams<{ oauth_id: string }>();
  const [activeTab, setActiveTab] = useState<TabId>("games");
  const userProfileQuery = useUserProfile({ oauthId: oauth_id });
  const userFriendGamesStatus = useUserFriendGamesStatus({
    oauthId: userProfileQuery.data?.user?.oauthId,
  });

  const handleRefresh = () => {
    userProfileQuery.refetch();
  };

  const items = mapGamesStatusToItem(
    userFriendGamesStatus.data?.userFriendGamesStatus.userGamesStatus || [],
  );

  const user = userProfileQuery.data?.user;

  return (
    <VStack className="h-full gap-4">
      {!userProfileQuery.loading && user ? (
        <FriendProfileHeader
          name={user.profile?.name}
          avatarUrl={user.profile?.avatarUrl}
          gamesCount={
            userFriendGamesStatus.data?.userFriendGamesStatus.pagination
              .total ?? 0
          }
          achievementsCount={
            user.gamesStatus?.filter((gs) => gs.achievementsCompleted).length
          }
          lastActivity={user.userActivity?.[0]?.formattedUpdatedAt}
          onRefreshClick={handleRefresh}
        />
      ) : (
        <View className="pt-8">
          <ActivityIndicator size="large" color="#3B82F6" />
        </View>
      )}

      <FriendProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "games" && (
        <VStack className="flex-1 gap-3">
          <HStack className="gap-3 px-4">
            <GamesStatusListSearch />
            {user && (
              <Link
                asChild
                href={`/friends/user_profile/${user.oauthId}/modal`}
              >
                <ButtonWithIcon
                  action="primary"
                  className="h-[44px] w-[44px]"
                  onPress={() => {}}
                  icon={<Filter size={20} color="#ffffff" />}
                />
              </Link>
            )}
          </HStack>
          <GamesStatusGrid
            items={items}
            loading={userFriendGamesStatus.loading}
            onRefresh={userFriendGamesStatus.onRefresh}
            onEndReached={userFriendGamesStatus.fetchMoreGamesStatus}
            emptyTitle="Brak gier"
            emptyDescription="Ten użytkownik nie dodał jeszcze żadnych gier"
            renderItem={(item) => (
              <FriendGamesStatusListItem item={item} oauthId={oauth_id || ""} />
            )}
          />
        </VStack>
      )}

      {activeTab === "stats" && <FriendStatsTab />}

      {activeTab === "activity" && (
        <FriendActivityTab activities={user?.userActivity} />
      )}
    </VStack>
  );
};
