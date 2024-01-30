import { Drawer } from "expo-router/drawer";
import { useAuth0 } from "react-native-auth0";

import { DrawerCustomContent } from "../../../modules/layouts/header/drawer/drawer_custom_content";
import { Header } from "../../../modules/layouts/header/header";

const AppLayout = () => {
  const { user } = useAuth0();
  return (
    <Drawer
      screenOptions={{
        header: Header,
      }}
      drawerContent={DrawerCustomContent}
    >
      <Drawer.Screen
        name="(authorized)/user"
        options={{
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
          drawerItemStyle: {
            display: !user ? "flex" : "none",
          },
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      <Drawer.Screen
        name="search/index"
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer>
  );
};

export default AppLayout;
