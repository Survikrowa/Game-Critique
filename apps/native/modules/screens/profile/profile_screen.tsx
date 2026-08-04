import { StickyNote } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { Text } from "ui/typography/text";

import { LogoutButton } from "./logout_button/logout_button";
import { ProfileEditorForm } from "./profile_editor_form/profile_editor_form";
import { ProfileFeatures } from "./profile_features/profile_features";
import { useCurrentProfileView } from "./use_current_profile_view";
import { useUserProfileInfo } from "./use_user_profile_info/use_user_profile_info";
import { UserAvatar } from "../../user/user_avatar/user_avatar";

import { Skeleton, SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { Card } from "@/ui/panels/card/card";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

export const ProfileScreen = () => {
  const userProfileInfo = useUserProfileInfo();
  const { currentProfileViewType, handleProfileViewChange } =
    useCurrentProfileView();
  if (userProfileInfo.loading || !userProfileInfo.data) {
    return (
      <VStack className="gap-4">
        <Card className="p-4">
          <HStack className="items-center gap-4">
            <Skeleton variant="circular" style={{ width: 48, height: 48 }} />
            <VStack className="gap-2 flex-1">
              <Skeleton style={{ width: 128, height: 16 }} />
            </VStack>
          </HStack>
          <HStack className="items-center justify-center mt-4">
            <Skeleton style={{ width: 96, height: 44, borderRadius: 8 }} />
          </HStack>
        </Card>
        <Card className="p-4">
          <SkeletonText _lines={3} />
        </Card>
      </VStack>
    );
  }
  if (currentProfileViewType === "edit") {
    return (
      <Card>
        <VStack className="items-center p-4 gap-4">
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
      <Card className="p-4">
        <HStack className="items-center gap-4">
          <UserAvatar
            avatarUrl={userProfileInfo.data.profileInfo.avatarUrl}
            size="$6"
          />
          <VStack>
            <Text size="medium" color="primary" weight="bold">
              {userProfileInfo.data.profileInfo.name}
            </Text>
          </VStack>
        </HStack>
        <HStack className="items-center justify-center mt-4">
          <Pressable
            className="items-center p-3 min-h-[44px] bg-background-100 rounded-lg"
            onPress={handleProfileViewChange}
          >
            <StickyNote size={16} color="#3B82F6" />
            <Text size="small" color="primary" weight="bold">
              Edytuj profil
            </Text>
          </Pressable>
        </HStack>
      </Card>
      <ProfileFeatures />
      <View>
        <LogoutButton />
      </View>
    </VStack>
  );
};
