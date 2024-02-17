import { useAuth0 } from "react-native-auth0";
import { YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsActivityLoading } from "./friends_activity_loading/friends_activity_loading";
import { useFriendsActivity } from "./use_friends_activity/use_friends_activity";
import { UserActivityCard } from "../../user_activity/user_activity_card/user_activity_card";

export const FriendsActivity = () => {
  const friendsActivityQuery = useFriendsActivity();
  const { user } = useAuth0();
  if (!user) {
    return null;
  }
  const friendsActivity = friendsActivityQuery.data?.friendsActivity.map(
    ({ user }) => ({
      game: {
        status: user.activity[0].activityType,
        name: user.activity[0].game?.name || "",
        formattedUpdatedAt: user.activity[0].formattedUpdatedAt,
        cover: user.activity[0].game?.cover?.smallUrl,
      },
      ownerName: user.name,
    }),
  );
  return (
    <YStack gap={8}>
      <Text size="large" weight="bold" color="primary">
        Aktywność znajomych
      </Text>
      {friendsActivityQuery.loading && <FriendsActivityLoading />}
      {friendsActivity && <UserActivityCard activities={friendsActivity} />}
    </YStack>
  );
};
