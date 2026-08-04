import { Gamepad2 } from "lucide-react-native";
import { ReactNode } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton, SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusGridProps<T extends { id: number }> = {
  items: T[];
  loading: boolean;
  onRefresh: () => void;
  onEndReached: () => void;
  renderItem: (item: T) => ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
};

export const GamesStatusGrid = <T extends { id: number }>({
  items,
  loading,
  onRefresh,
  onEndReached,
  renderItem,
  emptyTitle = "Brak gier",
  emptyDescription = "Dodaj swoją pierwszą grę klikając przycisk +",
}: GamesStatusGridProps<T>) => {
  if (!items || loading) {
    return (
      <VStack className="gap-4">
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
    <View className="flex-1">
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
            title={emptyTitle}
            description={emptyDescription}
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
        renderItem={({ item }) => <VStack>{renderItem(item)}</VStack>}
      />
    </View>
  );
};
