import { useAuth0 } from "react-native-auth0";
import { Text } from "ui/typography/text";

import { FriendsActivityLoading } from "./friends_activity_loading/friends_activity_loading";
import { useFriendsActivity } from "./use_friends_activity/use_friends_activity";
import { UserActivityCards } from "../../../user/user_activity/user_activity_cards/user_activity_cards";

import { VStack } from "@/ui/layout/vstack/vstack";

export const FriendsActivity = () => {
  const { friendsActivityQuery, getFriendsActivity } = useFriendsActivity();
  const { user } = useAuth0();
  if (!user) {
    return null;
  }
  const friendsActivity = getFriendsActivity();
  return (
    <VStack className="gap-2">
      <Text size="large" weight="bold" color="primary">
        Aktywność znajomych
      </Text>
      {friendsActivityQuery.loading && <FriendsActivityLoading />}
      {friendsActivity && <UserActivityCards activities={friendsActivity} />}
    </VStack>
  );
};
