import { useToastController } from "@tamagui/toast";

import { useSendFriendRequestMutation } from "./send_friend_request_mutation.generated";

export const useSendFriendRequest = () => {
  const toastController = useToastController();
  return useSendFriendRequestMutation({
    onCompleted: () => {
      toastController.show("Zaproszenie wysłane!", {
        variant: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      toastController.show("Użytkownik już dostał zaproszenie!", {
        variant: "error",
      });
    },
  });
};
