import { ChevronRight } from "@tamagui/lucide-icons";
import { useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import {
  Card,
  ScrollView,
  Separator,
  Spinner,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsListFab } from "./friends_list_fab/friends_list_fab";
import { useFriendsList } from "./use_friends_list/use_friends_list";
import { UserAvatar } from "../../../profile/user_avatar/user_avatar";

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
        <Card height="100%">
          <Card.Header>
            <View alignItems="center" marginBottom={16}>
              <Text size="extraLarge" color="primary" weight="bold">
                Twoi znajomi
              </Text>
            </View>
            <YStack>
              {friends.map((friend) => (
                <>
                  <XStack justifyContent="space-between" alignItems="center">
                    <XStack key={friend.id} alignItems="center" gap={8}>
                      <UserAvatar
                        avatarUrl={friend.avatarUrl || ""}
                        size="$6"
                      />
                      <Text size="medium" color="primary" weight="semiBold">
                        {friend.name}
                      </Text>
                    </XStack>
                    <ChevronRight />
                  </XStack>

                  {friends.length > 1 &&
                    friend.id !== friends[friends.length - 1].id && (
                      <Separator marginVertical={16} />
                    )}
                </>
              ))}
            </YStack>
          </Card.Header>
        </Card>
      </ScrollView>
      <FriendsListFab />
    </>
  );
};
