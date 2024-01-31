import { Drawer } from "expo-router/drawer";
import { useAuth0 } from "react-native-auth0";

import { DrawerCustomContent } from "../../../modules/layouts/header/drawer/drawer_custom_content";
import { Header } from "../../../modules/layouts/header/header";

const AppLayout = () => {
  const { user } = useAuth0();
  return (
    <Drawer drawerContent={DrawerCustomContent}>
      <Drawer.Screen
        name="(authorized)/user"
        options={{
          headerShown: true,
          header: Header,
          title: "Profil",
          drawerItemStyle: {
            display: user ? "flex" : "none",
          },
        }}
      />

      <Drawer.Screen
        name="auth"
        options={{
          title: "Zaloguj się",
          header: Header,
          headerShown: true,
          drawerItemStyle: {
            display: !user ? "flex" : "none",
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
        name="search/index"
        options={{
          headerShown: true,
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
