import { StickyNote } from "@tamagui/lucide-icons";
import { Button, Card, Spinner, View, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { LogoutButton } from "./logout_button/logout_button";
import { ProfileEditorForm } from "./profile_editor_form/profile_editor_form";
import { ProfileFeatures } from "./profile_features/profile_features";
import { useCurrentProfileView } from "./use_current_profile_view";
import { useUserProfileInfo } from "./use_user_profile_info/use_user_profile_info";
import { UserAvatar } from "../../user/user_avatar/user_avatar";

export const ProfileScreen = () => {
  const userProfileInfo = useUserProfileInfo();
  const { currentProfileViewType, handleProfileViewChange } =
    useCurrentProfileView();
  if (userProfileInfo.loading || !userProfileInfo.data) {
    return <Spinner size="large" />;
  }
  if (currentProfileViewType === "edit") {
    return (
      <Card backgroundColor="$color.container">
        <YStack display="flex" alignItems="center" padding="$4" gap={16}>
          <ProfileEditorForm
            onSubmit={handleProfileViewChange}
            defaultValues={{
              name: userProfileInfo.data.profileInfo.name || "",
              avatar: userProfileInfo.data.profileInfo.avatarUrl,
            }}
          />
        </YStack>
      </Card>
    );
  }
  return (
    <YStack gap={16}>
      <Card backgroundColor="$color.container" padding={16}>
        <XStack display="flex" alignItems="center" gap={16}>
          <UserAvatar
            avatarUrl={userProfileInfo.data.profileInfo.avatarUrl}
            size="$6"
          />
          <YStack>
            <View>
              <Text size="medium" color="primary" weight="bold">
                {userProfileInfo.data.profileInfo.name}
              </Text>
            </View>
          </YStack>
        </XStack>
        <XStack alignItems="center" justifyContent="center">
          <Button
            color="white"
            outlineColor="white"
            backgroundColor="black"
            onPress={handleProfileViewChange}
            height="min-content"
          >
            <YStack alignItems="center" padding={8}>
              <StickyNote width={16} height={16} color="white" />
              <Text size="small" color="primary" weight="bold">
                Edytuj profil
              </Text>
            </YStack>
          </Button>
        </XStack>
      </Card>
      <ProfileFeatures />
      <View>
        <LogoutButton />
      </View>
    </YStack>
  );
};
