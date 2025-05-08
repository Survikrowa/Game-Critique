import { Instagram } from "react-content-loader/native";
import { FlatList } from "react-native-gesture-handler";
import { Spinner, View, YStack } from "tamagui";

import { GamesStatusListItem } from "./games_status_list_item/games_status_list_item";

type GamesStatusListProps = {
  oauthId?: string;
  items: Item[];
  onRefresh: () => void;
  loading: boolean;
  onEndReached: () => void;
};

type Item = {
  id: number;
  title: string;
  platform: string;
  score: string;
  cover: string;
};

export const GamesStatusList = ({
  oauthId,
  items,
  onRefresh,
  loading,
  onEndReached,
}: GamesStatusListProps) => {
  if (!items || loading) {
    return (
      <YStack>
        <Instagram />
      </YStack>
    );
  }

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
        onRefresh={onRefresh}
        refreshing={loading}
        onEndReached={() => {
          if (!loading) {
            onEndReached();
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={
          loading ? (
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
