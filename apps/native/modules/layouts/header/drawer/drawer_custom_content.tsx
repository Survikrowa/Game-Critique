import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth0 } from "react-native-auth0";

export const DrawerCustomContent = (props: DrawerContentComponentProps) => {
  const { clearSession, user } = useAuth0();
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      {user && (
        <DrawerItem label="Wyloguj się" onPress={() => clearSession()} />
      )}
    </DrawerContentScrollView>
  );
};
