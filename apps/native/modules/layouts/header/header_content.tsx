import { LogIn, Search } from "lucide-react-native";
import { NotificationBell } from "./notifications/notification_bell";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";

import { useUserProfileInfo } from "@/modules/screens/profile/use_user_profile_info/use_user_profile_info";
import { truncateString } from "@/modules/strings/truncate_string";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/ui/media_and_icons/avatar/avatar";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";

const HeaderIconButton = ({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) => (
  <Pressable
    onPress={onPress}
    className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-background-100"
  >
    {children}
  </Pressable>
);

const AuthenticatedHeaderContent = () => {
  const { user } = useAuth0();
  const userProfileInfo = useUserProfileInfo();

  return (
    <>
      <Text size="large" weight="bold" color="primary">
        Siema, {truncateString(user?.name ?? "", 15)}
      </Text>
      <HStack className="items-center gap-2">
        <HeaderIconButton
          onPress={() =>
            // @ts-ignore — pre-existing route type
            router.push("/(app)/search/search")
          }
        >
          <Search size={18} color="#64748B" />
        </HeaderIconButton>
        <NotificationBell onPress={() => router.push("/(app)/notifications")} />
        <Pressable
          onPress={() => {}}
          className="min-h-[44px] min-w-[44px] items-center justify-center"
        >
          <Avatar size="sm">
            <AvatarFallbackText>{user?.name ?? "?"}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: userProfileInfo.data?.profileInfo.avatarUrl || "",
              }}
            />
          </Avatar>
        </Pressable>
      </HStack>
    </>
  );
};

const GuestHeaderContent = () => (
  <>
    <Text size="large" weight="bold" color="primary">
      Game Critique
    </Text>
    <HStack className="items-center gap-2">
      <HeaderIconButton
        onPress={() =>
          // @ts-ignore — pre-existing route type
          router.push("/(app)/search/search")
        }
      >
        <Search size={18} color="#64748B" />
      </HeaderIconButton>
      <HeaderIconButton
        onPress={() =>
          // @ts-ignore — pre-existing route type
          router.push("/(app)/auth")
        }
      >
        <LogIn size={18} color="#3B82F6" />
      </HeaderIconButton>
    </HStack>
  </>
);

export const HeaderContent = () => {
  const { user } = useAuth0();

  return (
    <HStack className="w-full items-center justify-between border-b border-outline-0 bg-background-50 px-4 py-3">
      {user ? <AuthenticatedHeaderContent /> : <GuestHeaderContent />}
    </HStack>
  );
};
