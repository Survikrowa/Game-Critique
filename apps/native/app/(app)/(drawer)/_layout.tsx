import { useRoute } from "@react-navigation/native";
import { User } from "@tamagui/lucide-icons";
import { Drawer } from "expo-router/drawer";
import { useAuth0 } from "react-native-auth0";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DrawerCustomContent } from "../../../modules/layouts/header/drawer/drawer_custom_content";
import { Header } from "../../../modules/layouts/header/header";

const AppLayout = () => {
  const { user } = useAuth0();
  const insets = useSafeAreaInsets();
  console.log(useRoute());

  return (
    <Drawer
      drawerContent={DrawerCustomContent}
      screenOptions={{
        drawerStyle: {
          marginTop: insets.top,
          backgroundColor: "hsl(212, 35.0%, 9.2%)",
        },
      }}
    >
      <Drawer.Screen
        name="(authorized)/user"
        options={{
          headerShown: true,
          header: Header,
          title: "Profil",
          drawerIcon: () => <User width={32} height={32} color="white" />,
          drawerItemStyle: {
            display: user ? "flex" : "none",
          },
          drawerLabelStyle: {
            color: "white",
          },
        }}
      />

      <Drawer.Screen
        name="auth"
        options={{
          title: "Zaloguj się",
          header: Header,
          headerShown: true,
          drawerIcon: () => <User width={32} height={32} color="white" />,
          drawerItemStyle: {
            display: !user ? "flex" : "none",
          },
          drawerLabelStyle: {
            color: "white",
          },
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="search"
        options={{
          headerShown: false,
          header: Header,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer>
  );
};

export default AppLayout;
