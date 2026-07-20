import { useToastController } from "ui/feedback/toast/use_toast_controller";

import { useRejectFriendRequestMutation } from "./reject_friend_request_mutation.generated";
import { haptic } from "@/modules/haptics/haptic";

export const useRejectFriendRequest = () => {
  const toast = useToastController();
  return useRejectFriendRequestMutation({
    refetchQueries: ["FriendsList", "FriendsRequests"],
    onCompleted: () => {
      haptic.medium();
      toast.show("Zaproszenie odrzucone", { variant: "error" });
    },
  });
};
