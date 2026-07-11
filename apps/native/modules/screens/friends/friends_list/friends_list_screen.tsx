import { ChevronRight, Users } from "lucide-react-native";
import { router } from "expo-router";
import { Fragment, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { Text } from "ui/typography/text";

import { FriendsListFab } from "./friends_list_fab/friends_list_fab";
import { useFriendsList } from "./use_friends_list/use_friends_list";
import { UserAvatar } from "../../../user/user_avatar/user_avatar";

import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Card } from "@/ui/panels/card/card";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";
import { haptic } from "@/modules/haptics/haptic";

export const FriendsListScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const friendsListQuery = useFriendsList();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await friendsListQuery.refetch();
    setIsRefreshing(false);
  };

  if (friendsListQuery.loading || !friendsListQuery.data) {
    return (
      <Card className="gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <HStack key={i} className="items-center gap-3">
            <Skeleton variant="circular" style={{ width: 40, height: 40 }} />
            <Skeleton style={{ flex: 1, height: 14 }} />
          </HStack>
        ))}
      </Card>
    );
  }
  const { friends } = friendsListQuery.data.friendsList;

  if (friends.length === 0) {
    return (
      <>
        <ScrollView
          className="h-full"
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
          }
        >
          <EmptyState
            title="Brak znajomych"
            description="Wyszukaj znajomych i dodaj ich do swojej listy"
            icon={<Users size={32} color="#3B82F6" />}
          />
        </ScrollView>
        <FriendsListFab />
      </>
    );
  }

  return (
    <>
      <ScrollView
        className="h-full max-h-[90%]"
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
        }
      >
        <Card className="h-full">
          <View className="items-center mb-4">
            <Text size="extraLarge" color="primary" weight="bold">
              Twoi znajomi
            </Text>
          </View>
          <VStack>
            {friends.map((friend, index) => (
              <Fragment key={friend.id}>
                <Pressable
                  className="justify-between items-center min-h-[44px]"
                  onPress={() => {
                    haptic.light();
                    // @ts-ignore — pre-existing route type
                    router.push(
                      `/friends/user_profile/${friend.id}?take=5&skip=0`,
                    );
                  }}
                >
                  <HStack className="items-center gap-2">
                    <UserAvatar avatarUrl={friend.avatarUrl || ""} size="$6" />
                    <Text size="medium" color="primary" weight="semiBold">
                      {friend.name}
                    </Text>
                  </HStack>
                  <ChevronRight size={18} color="#64748B" />
                </Pressable>

                {friends.length > 1 && friends.length - 1 !== index && (
                  <Separator spacing="md" />
                )}
              </Fragment>
            ))}
          </VStack>
        </Card>
      </ScrollView>
      <FriendsListFab />
    </>
  );
};
