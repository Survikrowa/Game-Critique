import { PlusCircle } from "lucide-react-native";
import { router } from "expo-router";

import { Fab, FabIcon, FabLabel } from "@/ui/overlay/fab/fab";

export const GamesStatusCategoriesFab = () => {
  return (
    <Fab
      placement="bottom right"
      size="lg"
      onPress={() => router.push("/games/games_search")}
    >
      <FabIcon as={PlusCircle} size="lg" />
      <FabLabel size="lg">Dodaj nową grę</FabLabel>
    </Fab>
  );
};
