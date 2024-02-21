import { YStack } from "tamagui";

import { BaseScreenLayout } from "../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { ProfilePage } from "../../../../modules/profile/profile_page";

const UserProfileScreen = () => {
  return (
    <BaseScreenLayout>
      <YStack backgroundColor="$green11" height="100%">
        <ProfilePage />
      </YStack>
    </BaseScreenLayout>
  );
};

export default UserProfileScreen;
