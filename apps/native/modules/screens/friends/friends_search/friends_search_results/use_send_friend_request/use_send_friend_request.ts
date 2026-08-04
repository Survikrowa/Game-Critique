import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { useSendFriendRequestMutation } from "./send_friend_request_mutation.generated";
import { haptic } from "@/modules/haptics/haptic";

export const useSendFriendRequest = () => {
  const toastController = useToastController();
  return useSendFriendRequestMutation({
    onCompleted: () => {
      haptic.success();
      toastController.show("Zaproszenie wysłane!", {
        variant: "success",
      });
    },
    onError: () => {
      haptic.error();
      toastController.show("Użytkownik już dostał zaproszenie!", {
        variant: "error",
      });
    },
  });
};
