import { ActivityIndicator, FlatList, View } from "react-native";
import { Gamepad2 } from "lucide-react-native";

import { GamesStatusListItem } from "./games_status_list_item/games_status_list_item";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton, SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

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
  achievementsCompleted: boolean;
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
      <VStack className="gap-4 p-4">
        {[1, 2, 3].map((i) => (
          <HStack key={i} className="gap-3">
            {[1, 2, 3].map((j) => (
              <VStack key={j} className="gap-2 flex-1">
                <Skeleton variant="rounded" className="h-32 w-full" />
                <SkeletonText _lines={2} className="h-3" />
              </VStack>
            ))}
          </HStack>
        ))}
      </VStack>
    );
  }

  return (
    <View style={{ flex: 1 }} key={items.length > 0 ? items[0].id : 0}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={items}
        numColumns={3}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 20,
        }}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
        }}
        onRefresh={onRefresh}
        refreshing={loading}
        onEndReached={() => {
          if (!loading) {
            onEndReached();
          }
        }}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          <EmptyState
            title="Brak gier"
            description="Dodaj swoją pierwszą grę klikając przycisk +"
            icon={<Gamepad2 size={32} color="#3B82F6" />}
          />
        }
        ListFooterComponent={
          loading ? (
            <VStack className="items-center flex-1 h-[42px]">
              <ActivityIndicator size="large" color="#3B82F6" />
            </VStack>
          ) : null
        }
        renderItem={({ item }) => {
          return (
            <VStack>
              <GamesStatusListItem oauthId={oauthId} item={item} />
            </VStack>
          );
        }}
      />
    </View>
  );
};
