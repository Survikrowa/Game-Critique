import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { useAcceptFriendRequestMutation } from "./accept_friend_request_mutation.generated";
import { haptic } from "@/modules/haptics/haptic";

export const useAcceptFriendRequest = () => {
  const toast = useToastController();
  return useAcceptFriendRequestMutation({
    refetchQueries: ["FriendsList", "FriendsRequests"],
    onCompleted: () => {
      haptic.success();
      toast.show("Zaproszenie zostało zaakceptowane", {
        variant: "success",
      });
    },
  });
};
