import { Link } from "expo-router";
import { View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { XStack } from "tamagui";

import { SearchButton } from "./search/search_button";
import { UserProfileButton } from "./user_profile_button";
import AppLogo from "../../../assets/logo/logo_app.svg";
import { Text } from "../../../ui/typography/text";

export const Header = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth0();

  return (
    <>
      <View style={{ paddingTop: insets.top }} />
      <XStack
        backgroundColor="$color.container"
        space
        padding={8}
        alignItems="center"
        justifyContent="space-between"
      >
        {!user && <UserProfileButton />}
        <Link href="/home">
          <Text size="medium" color="primary" weight="semiBold">
            <AppLogo width={48} height={48} style={{ color: "white" }} />
          </Text>
        </Link>

        <XStack gap={8}>
          <SearchButton />
        </XStack>
      </XStack>
    </>
  );
};
