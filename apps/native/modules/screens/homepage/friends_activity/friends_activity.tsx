import { useAuth0 } from "react-native-auth0";

import { FriendsActivityLoading } from "./friends_activity_loading/friends_activity_loading";
import { useFriendsActivity } from "./use_friends_activity/use_friends_activity";
import { UserActivityCards } from "../../../user/user_activity/user_activity_cards/user_activity_cards";

import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";

export const FriendsActivity = () => {
  const { friendsActivityQuery, getFriendsActivity } = useFriendsActivity();
  const { user } = useAuth0();
  if (!user) {
    return null;
  }
  const friendsActivity = getFriendsActivity();
  return (
    <HomepageSection heading="Aktywność znajomych">
      {friendsActivityQuery.loading && <FriendsActivityLoading />}
      {friendsActivity && <UserActivityCards activities={friendsActivity} />}
    </HomepageSection>
  );
};
