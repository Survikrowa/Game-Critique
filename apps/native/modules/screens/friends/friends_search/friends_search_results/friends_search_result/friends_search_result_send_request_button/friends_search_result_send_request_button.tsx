import { Button, Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";

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
      <YStack>
        <Text size="small" weight="bold" color="primary">
          Oczekuje na
        </Text>
        <Text size="small" weight="bold" color="primary">
          akceptacje
        </Text>
      </YStack>
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
