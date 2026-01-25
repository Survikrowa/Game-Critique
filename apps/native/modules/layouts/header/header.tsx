import { Link } from "expo-router";
import { View } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchButton } from "./search/search_button";
import { UserProfileButton } from "./user_profile_button";
import AppLogo from "../../../assets/logo/logo_app.svg";

import { Box } from "@/ui/layout/box/box";
import { HStack } from "@/ui/layout/hstack/hstack";

export const Header = () => {
  const insets = useSafeAreaInsets();
  const { user } = useAuth0();

  return (
    <>
      <View style={{ paddingTop: insets.top }} pointerEvents="none" />
      <HStack className="bg-black" space="md">
        <Box>{!user && <UserProfileButton />}</Box>
        <Box>
          <Link href="/home">
            <AppLogo width={48} height={48} style={{ color: "white" }} />
          </Link>
        </Box>
        <Box>
          <SearchButton />
        </Box>
      </HStack>
    </>
  );
};
