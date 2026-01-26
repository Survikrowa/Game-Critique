import { useAuth0 } from "react-native-auth0";

import { NotificationIcon } from "@/modules/layouts/header/notifications/notification_icon";
import { useUserProfileInfo } from "@/modules/screens/profile/use_user_profile_info/use_user_profile_info";
import { truncateString } from "@/modules/strings/truncate_string";
import { Box } from "@/ui/layout/box/box";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/ui/media_and_icons/avatar/avatar";
import { GText } from "@/ui/typography/text";

export const HeaderContent = () => {
  const { user } = useAuth0();
  const userProfileInfo = useUserProfileInfo();

  return (
    <Box className="bg-dark-800 flex flex-row items-center justify-between w-full py-6 px-4">
      {user && (
        <>
          <GText size="2xl" bold>
            Siema, {truncateString(user.name ?? "", 15)}
          </GText>
          <Box className="flex flex-row items-center gap-4">
            <NotificationIcon />
            <Avatar size="md">
              <AvatarFallbackText>Jane Doe</AvatarFallbackText>
              <AvatarImage
                source={{
                  uri: userProfileInfo.data?.profileInfo.avatarUrl || "",
                }}
              />
            </Avatar>
          </Box>
        </>
      )}
    </Box>
  );
};
