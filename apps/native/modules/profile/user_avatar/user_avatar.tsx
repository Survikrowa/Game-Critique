import { View } from "react-native";
import { Avatar } from "tamagui";

type UserAvatarProps = {
  avatarUrl: string;
};

export const UserAvatar = ({ avatarUrl }: UserAvatarProps) => {
  return (
    <View>
      <Avatar circular size="$9">
        <Avatar.Image src={avatarUrl} />
      </Avatar>
    </View>
  );
};
