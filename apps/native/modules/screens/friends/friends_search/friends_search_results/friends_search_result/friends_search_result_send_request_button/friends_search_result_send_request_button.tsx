import { ActivityIndicator } from "react-native";
import { Text } from "ui/typography/text";

import { Button, ButtonText } from "@/ui/forms/button/button";
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
      action="primary"
      isDisabled={sendFriendRequestLoading}
      onPress={() => handleSendFriendRequest(oauthId)}
    >
      {sendFriendRequestLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <ButtonText>Dodaj</ButtonText>
      )}
    </Button>
  );
};
