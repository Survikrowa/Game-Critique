import { Instagram } from "react-content-loader/native";
import { FlatList } from "react-native";
import { YStack } from "tamagui";

import { GamesStatusListItem } from "./games_status_list_item/games_status_list_item";
import { mapGamesStatusToItem } from "./map_games_status_to_item";
import { useUserGamesStatus } from "../use_user_games_status/use_user_games_status";

type GamesStatusListProps = {
  oauthId?: string;
};

export const GamesStatusList = ({ oauthId }: GamesStatusListProps) => {
  const gamesStatus = useUserGamesStatus({
    take: 5,
    skip: 0,
  });
  if (gamesStatus.loading || !gamesStatus.data) {
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
    <FlatList
      data={items}
      numColumns={3}
      contentContainerStyle={{
        display: "flex",
        gap: 12,
      }}
      columnWrapperStyle={{
        flex: 1,
        display: "flex",
        gap: 20,
        justifyContent: "space-evenly",
      }}
      renderItem={({ item }) => {
        return (
          <YStack>
            <GamesStatusListItem oauthId={oauthId} item={item} />
          </YStack>
        );
      }}
    />
  );
};
