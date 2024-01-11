import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerActions, ParamListBase } from "@react-navigation/native";
import { User } from "@tamagui/lucide-icons";
import { useNavigation } from "expo-router";

import { ButtonWithIcon } from "../../../../ui/forms/button_icon";

export const DrawerToggleButton = () => {
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  return (
    <ButtonWithIcon
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      icon={<User color="$purple1" size="$2" />}
      backgroundColor="transparent"
      padding={4}
    />
  );
};
