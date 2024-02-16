import { useApolloClient } from "@apollo/client";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { useAuth0 } from "react-native-auth0";

export const DrawerCustomContent = (props: DrawerContentComponentProps) => {
  const { clearSession, user } = useAuth0();
  const client = useApolloClient();
  return (
    <DrawerContentScrollView>
      <DrawerItemList {...props} />
      {user && (
        <DrawerItem
          label="Wyloguj się"
          onPress={async () => {
            await client.clearStore();
            await clearSession();
            router.push("/");
          }}
        />
      )}
    </DrawerContentScrollView>
  );
};
