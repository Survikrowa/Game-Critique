import { Button, Spinner, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { useAcceptFriendRequest } from "./use_accept_friend_request/use_accept_friend_request";
import { UserAvatar } from "../../../../../user/user_avatar/user_avatar";

type FriendsRequestsSenderProps = {
  sender: Sender;
};

type Sender = {
  oauthId: string;
  profile?: {
    name?: string | null;
    avatarUrl: string;
  } | null;
};

export const FriendsRequestsSender = ({
  sender,
}: FriendsRequestsSenderProps) => {
  const [acceptFriendRequest, { loading }] = useAcceptFriendRequest();

  const handleConfirmButton = () => {
    acceptFriendRequest({ variables: { senderOauthId: sender.oauthId } });
  };
  return (
    <YStack borderWidth="$0.25" padding={8} borderRadius={16}>
      <XStack alignItems="center" gap={8}>
        <UserAvatar avatarUrl={sender.profile?.avatarUrl || ""} size="$6" />
        <Text size="large" weight="semiBold" color="primary">
          {sender.profile?.name}
        </Text>
      </XStack>
      <XStack width="100%" alignItems="center" justifyContent="center">
        <XStack
          gap={4}
          maxWidth={120}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            color="black"
            outlineColor="black"
            backgroundColor="$background"
            borderColor="black"
          >
            Odrzuć
          </Button>
          <Button
            color="white"
            outlineColor="white"
            backgroundColor="black"
            onPress={handleConfirmButton}
          >
            {loading ? <Spinner size="small" /> : "Dodaj"}
          </Button>
        </XStack>
      </XStack>
    </YStack>
  );
};
