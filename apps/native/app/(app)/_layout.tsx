import { Drawer } from "expo-router/drawer";
import { useAuth0 } from "react-native-auth0";

import { DrawerCustomContent } from "../../modules/layouts/header/drawer/drawer_custom_content";
import { Header } from "../../modules/layouts/header/header";

const AppLayout = () => {
  const { user, clearSession } = useAuth0();
  return (
    <>
      <Drawer
        screenOptions={{
          header: Header,
        }}
        drawerContent={DrawerCustomContent}
      >
        <Drawer.Screen
          name="auth"
          options={{
            drawerLabel: "Zaloguj się",
            title: "overview",
            drawerItemStyle: { display: user ? "none" : "flex" },
          }}
        />
        <Drawer.Screen
          name="user/index"
          options={{
            drawerLabel: "Profil",
            title: "overview",
            drawerItemStyle: { display: !user ? "none" : "flex" },
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="search/index"
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </>
  );
};

export default AppLayout;
