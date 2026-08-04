import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { Image } from "react-native";

type AvatarSize = "$3" | "$6" | "$9";

type UserAvatarProps = {
  avatarUrl: string;
  size?: AvatarSize;
};

const avatarStyle = tva({
  base: "rounded-full overflow-hidden",
  variants: {
    size: {
      $3: "w-8 h-8",
      $6: "w-16 h-16",
      $9: "w-24 h-24",
    },
  },
});

export const UserAvatar = ({ avatarUrl, size = "$9" }: UserAvatarProps) => {
  return (
    <Image
      source={{ uri: avatarUrl }}
      className={avatarStyle({ size })}
      resizeMode="cover"
    />
  );
};
