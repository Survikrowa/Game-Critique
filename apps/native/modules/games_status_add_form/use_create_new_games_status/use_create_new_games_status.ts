import { useToastController } from "@tamagui/toast";

import { useCreateNewGamesStatusMutation } from "./create_new_games_status_mutation.generated";

export const useCreateNewGamesStatus = () => {
  const toastController = useToastController();
  return useCreateNewGamesStatusMutation({
    refetchQueries: ["UserGamesStatusQuery"],
    onError: (error) => {
      toastController.show(error.message, {
        description: "Wystąpił błąd podczas tworzenia nowego statusu gry",
        variant: "error",
      });
    },
  });
};
