import { Button, Spinner, XStack, YStack } from "tamagui";

import { ProfileEditorForm } from "./profile_editor_form/profile_editor_form";
import { useCurrentProfileView } from "./use_current_profile_view";
import { useUserProfileInfo } from "./use_user_profile_info/use_user_profile_info";
import { UserAvatar } from "./user_avatar/user_avatar";
import { Text } from "../../ui/typography/text";

export const ProfilePage = () => {
  const userProfileInfo = useUserProfileInfo();
  const { currentProfileViewType, handleProfileViewChange } =
    useCurrentProfileView();
  if (userProfileInfo.loading || !userProfileInfo.data) {
    return <Spinner size="large" />;
  }
  if (currentProfileViewType === "edit") {
    return (
      <YStack display="flex" alignItems="center" padding="$4" gap={16}>
        <ProfileEditorForm
          onSubmit={handleProfileViewChange}
          defaultValues={{
            name: userProfileInfo.data.profileInfo.name,
            avatar: userProfileInfo.data.profileInfo.avatarUrl,
          }}
        />
      </YStack>
    );
  }
  return (
    <YStack display="flex" alignItems="center" padding="$4" gap={16}>
      <UserAvatar avatarUrl={userProfileInfo.data.profileInfo.avatarUrl} />
      <XStack style={{ gap: 8 }}>
        <Text size="large" color="primary" weight="bold">
          Twój nickname:
        </Text>
        <Text size="medium" color="primary" weight="normal">
          {userProfileInfo.data.profileInfo.name}
        </Text>
      </XStack>
      <Button
        color="white"
        outlineColor="white"
        backgroundColor="black"
        themeInverse
        onPress={handleProfileViewChange}
      >
        Edytuj profil
      </Button>
    </YStack>
  );
};
