import { View } from "react-native";
import { Avatar } from "tamagui";

type UserAvatarProps = {
  avatarUrl: string;
  size?: "$3" | "$6" | "$9";
};

export const UserAvatar = ({ avatarUrl, size = "$9" }: UserAvatarProps) => {
  return (
    <View>
      <Avatar circular size={size}>
        <Avatar.Image src={avatarUrl} />
      </Avatar>
    </View>
  );
};
