import { useToastController } from "@tamagui/toast";

import { useProfileInfoQuery } from "./profile_info.generated";

export const useUserProfileInfo = () => {
  const toastController = useToastController();

  return useProfileInfoQuery({
    onError: (error) => {
      toastController.show(
        "Wystąpił błąd podczas pobierania informacji o userze",
        {
          description: error.message,
          variant: "error",
        },
      );
    },
  });
};
