import { useToastController } from "@tamagui/toast";

import { useRemoveGameStatusMutation } from "./remove_game_status_mutation.generated";

export const useRemoveGameStatus = () => {
  const toastController = useToastController();
  return useRemoveGameStatusMutation({
    refetchQueries: ["UserGamesStatusQuery"],
    onCompleted: () => {
      toastController.show("Status gry został usunięty", {
        description: "",
        variant: "success",
      });
    },
    onError: () => {
      toastController.show("Wystąpił błąd podczas usuwania statusu gry", {
        description: "",
        variant: "error",
      });
    },
  });
};
