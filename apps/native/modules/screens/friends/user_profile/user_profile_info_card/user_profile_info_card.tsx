import { RefreshCcw } from "lucide-react-native";
import { View } from "react-native";
import { ButtonWithIcon } from "ui/forms/button_icon";
import { Text } from "ui/typography/text";

import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { Card } from "@/ui/panels/card/card";
import { HStack } from "@/ui/layout/hstack/hstack";

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
    <Card className="relative p-4">
      <HStack className="items-center gap-4">
        <UserAvatar avatarUrl={avatarUrl || ""} size="$6" />
        <HStack className="gap-2">
          <Text size="medium" weight="bold" color="primary">
            Nazwa:
          </Text>
          <Text size="medium" weight="semiBold" color="primary">
            {name}
          </Text>
        </HStack>
        <View className="absolute top-0 right-0">
          <ButtonWithIcon
            onPress={onRefreshClick}
            icon={<RefreshCcw size={16} color="#3B82F6" />}
          />
        </View>
      </HStack>
    </Card>
  );
};
