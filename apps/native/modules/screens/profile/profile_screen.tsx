import { StickyNote } from "@tamagui/lucide-icons";
import { Button, Card, Spinner, View } from "tamagui";
import { Text } from "ui/typography/text";

import { LogoutButton } from "./logout_button/logout_button";
import { ProfileEditorForm } from "./profile_editor_form/profile_editor_form";
import { ProfileFeatures } from "./profile_features/profile_features";
import { useCurrentProfileView } from "./use_current_profile_view";
import { useUserProfileInfo } from "./use_user_profile_info/use_user_profile_info";
import { UserAvatar } from "../../user/user_avatar/user_avatar";

import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

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
        <VStack className="flex items-center p-4 gap-4">
          <ProfileEditorForm
            onSubmit={handleProfileViewChange}
            defaultValues={{
              name: userProfileInfo.data.profileInfo.name || "",
              avatar: userProfileInfo.data.profileInfo.avatarUrl,
            }}
          />
        </VStack>
      </Card>
    );
  }
  return (
    <VStack className="gap-4">
      <Card backgroundColor="$color.container" padding={16}>
        <HStack className="flex items-center gap-4">
          <UserAvatar
            avatarUrl={userProfileInfo.data.profileInfo.avatarUrl}
            size="$6"
          />
          <VStack>
            <View>
              <Text size="medium" color="primary" weight="bold">
                {userProfileInfo.data.profileInfo.name}
              </Text>
            </View>
          </VStack>
        </HStack>
        <HStack className="items-center justify-center">
          <Button
            color="white"
            outlineColor="white"
            backgroundColor="black"
            onPress={handleProfileViewChange}
            height="min-content"
          >
            <VStack className="items-center p-2">
              <StickyNote width={16} height={16} color="white" />
              <Text size="small" color="primary" weight="bold">
                Edytuj profil
              </Text>
            </VStack>
          </Button>
        </HStack>
      </Card>
      <ProfileFeatures />
      <View>
        <LogoutButton />
      </View>
    </VStack>
  );
};
