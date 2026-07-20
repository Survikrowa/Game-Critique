import { router } from "expo-router";
import { Bell, ChevronRight, Search, Users } from "lucide-react-native";
import { FlatList, RefreshControl, View } from "react-native";

import { useFriendsList } from "./use_friends_list/use_friends_list";

import { haptic } from "@/modules/haptics/haptic";
import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";
import { SpeedDialFab } from "@/ui/overlay/fab/speed_dial_fab";
import { Text } from "@/ui/typography/text";
import { FriendsListQuery } from "./use_friends_list/friends_list_query.generated";

type Friend = FriendsListQuery["friendsList"]["friends"][number];

const LoadingState = () => (
  <VStack className="gap-4 px-4 pt-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <HStack key={i} className="items-center gap-3">
        <Skeleton variant="circular" style={{ width: 40, height: 40 }} />
        <Skeleton style={{ flex: 1, height: 14 }} />
      </HStack>
    ))}
  </VStack>
);

export const FriendsListScreen = () => {
  const friendsListQuery = useFriendsList();

  if (friendsListQuery.loading || !friendsListQuery.data) {
    return <LoadingState />;
  }

  const { friends } = friendsListQuery.data.friendsList;

  return (
    <View className="flex-1">
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="items-center py-4">
            <Text size="extraLarge" color="primary" weight="bold">
              Twoi znajomi
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            className="min-h-[44px] flex-row items-center justify-between px-4"
            onPress={() => {
              haptic.light();
              router.push(`/friends/user_profile/${item.id}?take=5&skip=0`);
            }}
          >
            <HStack className="items-center gap-2">
              <UserAvatar avatarUrl={item.avatarUrl || ""} size="$6" />
              <Text size="medium" color="primary" weight="semiBold">
                {item.name}
              </Text>
            </HStack>
            <ChevronRight size={18} color="#64748B" />
          </Pressable>
        )}
        ItemSeparatorComponent={() => <Separator spacing="md" />}
        ListEmptyComponent={
          <EmptyState
            title="Brak znajomych"
            description="Wyszukaj znajomych i dodaj ich do swojej listy"
            icon={<Users size={32} color="#3B82F6" />}
          />
        }
        refreshControl={
          <RefreshControl
            onRefresh={() => friendsListQuery.refetch()}
            refreshing={friendsListQuery.loading}
          />
        }
        className="flex-1"
      />
      <SpeedDialFab
        actions={[
          {
            icon: Bell,
            label: "Zaproszenia",
            onPress: () => router.push("/friends/friends_requests"),
          },
          {
            icon: Search,
            label: "Szukaj",
            onPress: () => router.push("/friends/friends_search"),
          },
        ]}
      />
    </View>
  );
};
