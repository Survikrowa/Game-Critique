import { BaseScreenLayout } from "../../../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { FriendsSearchScreen } from "../../../../../../../modules/screens/friends/friends_search/friends_search_screen";

export const FriendsSearch = () => {
  return (
    <BaseScreenLayout>
      <FriendsSearchScreen />
    </BaseScreenLayout>
  );
};

export default FriendsSearch;
