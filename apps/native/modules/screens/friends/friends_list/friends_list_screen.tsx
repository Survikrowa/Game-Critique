import { ChevronRight } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import { Fragment, useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { Card, ScrollView, Separator, Spinner, View } from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsListFab } from "./friends_list_fab/friends_list_fab";
import { useFriendsList } from "./use_friends_list/use_friends_list";
import { UserAvatar } from "../../../user/user_avatar/user_avatar";

import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

export const FriendsListScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const friendsListQuery = useFriendsList();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await friendsListQuery.refetch();
    setIsRefreshing(false);
  };

  if (friendsListQuery.loading || !friendsListQuery.data) {
    return <Spinner />;
  }
  const { friends } = friendsListQuery.data.friendsList;
  return (
    <>
      <ScrollView
        height="100%"
        maxHeight="90%"
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
        }
      >
        <Card height="100%" padding={16} backgroundColor="$color.container">
          <View alignItems="center" marginBottom={16}>
            <Text size="extraLarge" color="primary" weight="bold">
              Twoi znajomi
            </Text>
          </View>
          <VStack>
            {friends.map((friend, index) => (
              <Fragment key={friend.id}>
                <Pressable
                  className="justify-between items-center"
                  onPress={() =>
                    router.push(
                      `/friends/user_profile/${friend.id}?take=5&skip=0`,
                    )
                  }
                >
                  <HStack className="items-center gap-2" key={friend.id}>
                    <UserAvatar avatarUrl={friend.avatarUrl || ""} size="$6" />
                    <Text size="medium" color="primary" weight="semiBold">
                      {friend.name}
                    </Text>
                  </HStack>
                  <ChevronRight color="white" />
                </Pressable>

                {friends.length > 1 && friends.length - 1 !== index && (
                  <Separator marginVertical={16} />
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
