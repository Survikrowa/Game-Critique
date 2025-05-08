import { useApolloClient } from "@apollo/client";
import { useEffect } from "react";
import { Instagram } from "react-content-loader/native";
import { FlatList } from "react-native-gesture-handler";
import { Spinner, View, YStack } from "tamagui";

import { GamesStatusListItem } from "./games_status_list_item/games_status_list_item";
import { mapGamesStatusToItem } from "./map_games_status_to_item";
import { useUserGamesStatus } from "../use_user_games_status/use_user_games_status";

type GamesStatusListProps = {
  oauthId?: string;
};

export const GamesStatusList = ({ oauthId }: GamesStatusListProps) => {
  const gamesStatus = useUserGamesStatus({ oauthId });
  const cache = useApolloClient();
  if (!gamesStatus.data) {
    return (
      <YStack>
        <Instagram />
      </YStack>
    );
  }
  const items = mapGamesStatusToItem(
    gamesStatus.data.userGamesStatus.userGamesStatus,
  );

  return (
    <View flex={1} key={items.length > 0 ? items[0].id : 0}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={items}
        numColumns={3}
        contentContainerStyle={{
          display: "flex",
          gap: 12,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          flex: 1,
          display: "flex",
          gap: 20,
          justifyContent: "space-evenly",
        }}
        onRefresh={gamesStatus.onRefresh}
        refreshing={gamesStatus.loading}
        onEndReached={() => {
          if (!gamesStatus.loading) {
            gamesStatus.fetchMoreGamesStatus();
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          gamesStatus.loading ? (
            <YStack alignItems="center" flex={1} height={42}>
              <Spinner size="large" />
            </YStack>
          ) : null
        }
        renderItem={({ item }) => {
          return (
            <YStack>
              <GamesStatusListItem oauthId={oauthId} item={item} />
            </YStack>
          );
        }}
      />
    </View>
  );
};
