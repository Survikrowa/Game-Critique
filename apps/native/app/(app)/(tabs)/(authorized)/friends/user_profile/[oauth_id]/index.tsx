import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { FriendProfileScreen } from "@/modules/screens/friend_profile/friend_profile_screen";

const UserProfile = () => {
  return (
    <BaseScreenLayout>
      <FriendProfileScreen />
    </BaseScreenLayout>
  );
};

export default UserProfile;
