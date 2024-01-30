import { YStack } from "tamagui";

import { ProfilePage } from "../../../../modules/profile/profile_page";

const UserProfileScreen = () => {
  return (
    <YStack backgroundColor="$green11" height="100%">
      <ProfilePage />
    </YStack>
  );
};

export default UserProfileScreen;
