import { RefreshCcw } from "@tamagui/lucide-icons";
import { Card, View, XStack } from "tamagui";
import { ButtonWithIcon } from "ui/forms/button_icon";
import { Text } from "ui/typography/text";

import { UserAvatar } from "../../../../profile/user_avatar/user_avatar";

type UserProfileInfoCardProps = {
  name?: string | null;
  avatarUrl?: string | null;
  onRefreshClick: () => void;
};

export const UserProfileInfoCard = ({
  name,
  avatarUrl,
  onRefreshClick,
}: UserProfileInfoCardProps) => {
  return (
    <Card position="relative" padding={16} backgroundColor="$color.container">
      <XStack alignItems="center" gap={16}>
        <UserAvatar avatarUrl={avatarUrl || ""} size="$6" />
        <XStack gap={4}>
          <Text size="medium" weight="bold" color="primary">
            Nazwa:
          </Text>
          <Text size="medium" weight="semiBold" color="primary">
            {name}
          </Text>
        </XStack>
        <View position="absolute" top={0} right={0}>
          <ButtonWithIcon onPress={onRefreshClick} icon={<RefreshCcw />} />
        </View>
      </XStack>
    </Card>
  );
};
