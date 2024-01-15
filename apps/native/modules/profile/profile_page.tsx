import { YStack } from "tamagui";

import { UserAvatar } from "./user_avatar/user_avatar";
import { Text } from "../../ui/typography/text";

export const ProfilePage = () => {
  return (
    <YStack>
      <Text size="medium" weight="normal" color="secondary">
        Witaj userze
      </Text>
      <UserAvatar />
    </YStack>
  );
};
