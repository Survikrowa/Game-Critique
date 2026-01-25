import { Button, Spinner } from "tamagui";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

type FriendsSearchResultSendRequestButtonProps = {
  isFriendRequestSent: boolean;
  handleSendFriendRequest: (oauthId: string) => Promise<void>;
  oauthId: string;
  receiverId?: string;
  sendFriendRequestLoading: boolean;
};

export const FriendsSearchResultSendRequestButton = ({
  isFriendRequestSent,
  receiverId,
  handleSendFriendRequest,
  oauthId,
  sendFriendRequestLoading,
}: FriendsSearchResultSendRequestButtonProps) => {
  if (isFriendRequestSent) {
    return (
      <VStack>
        <Text size="small" weight="bold" color="primary">
          Oczekuje na
        </Text>
        <Text size="small" weight="bold" color="primary">
          akceptacje
        </Text>
      </VStack>
    );
  }

  if (receiverId) {
    return (
      <Text size="medium" weight="bold" color="primary">
        Wysłano!
      </Text>
    );
  }

  return (
    <Button
      theme="active"
      backgroundColor="black"
      color="white"
      disabled={sendFriendRequestLoading}
      onPress={() => handleSendFriendRequest(oauthId)}
    >
      {sendFriendRequestLoading ? <Spinner size="small" /> : "Dodaj"}
    </Button>
  );
};
