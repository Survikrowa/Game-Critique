import { useAuth0 } from "react-native-auth0";
import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { useProfileInfoQuery } from "@/modules/screens/profile/use_user_profile_info/profile_info.generated";

export const useUserProfileInfo = () => {
  const toastController = useToastController();
  const { user } = useAuth0();

  return useProfileInfoQuery({
    skip: !user,
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
