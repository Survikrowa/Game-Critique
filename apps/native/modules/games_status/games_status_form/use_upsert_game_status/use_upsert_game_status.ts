import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { useUpsertGameStatusMutation } from "./use_upsert_game_status_mutation.generated";

export const useUpsertGameStatus = () => {
  const toastController = useToastController();
  return useUpsertGameStatusMutation({
    refetchQueries: ["UserGamesStatusQuery"],
    onError: (error) => {
      toastController.show(error.message, {
        description: "Wystąpił błąd podczas zapisywania statusu gry",
        variant: "error",
      });
    },
  });
};
