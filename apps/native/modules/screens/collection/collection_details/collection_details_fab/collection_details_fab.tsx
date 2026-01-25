import { PlusCircle } from "@tamagui/lucide-icons";
import { router } from "expo-router";

import { Fab, FabIcon, FabLabel } from "@/ui/overlay/fab/fab";

export const CollectionDetailsFab = () => {
  return (
    <Fab
      placement="bottom right"
      size="lg"
      onPress={() => router.push("collection/collection_game_search")}
    >
      <FabIcon as={PlusCircle} size="lg" />
      <FabLabel size="lg">Dodaj grę do kolekcji</FabLabel>
    </Fab>
  );
};
