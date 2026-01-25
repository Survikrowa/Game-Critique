import { Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { Fab, FabIcon, FabLabel } from "@/ui/overlay/fab/fab";

export const FriendsListFab = () => {
  return (
    <Fab
      placement="bottom right"
      size="lg"
      onPress={() => router.push("/friends/friends_search/")}
    >
      <FabIcon as={Search} size="lg" />
      <FabLabel size="lg">Dodaj znajomych</FabLabel>
    </Fab>
  );
};
