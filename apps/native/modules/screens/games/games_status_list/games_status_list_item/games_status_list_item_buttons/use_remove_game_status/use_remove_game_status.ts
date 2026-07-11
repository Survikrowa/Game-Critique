import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { useRemoveGameStatusMutation } from "@/modules/screens/games/games_status_list/games_status_list_item/games_status_list_item_buttons/use_remove_game_status/remove_game_status_mutation.generated";
import { haptic } from "@/modules/haptics/haptic";

export const useRemoveGameStatus = () => {
  const toastController = useToastController();
  return useRemoveGameStatusMutation({
    refetchQueries: ["UserGamesStatusQuery"],
    onCompleted: () => {
      haptic.success();
      toastController.show("Status gry został usunięty", {
        description: "",
        variant: "success",
      });
    },
    onError: () => {
      haptic.error();
      toastController.show("Wystąpił błąd podczas usuwania statusu gry", {
        description: "",
        variant: "error",
      });
    },
  });
};
