import { Button, Spinner } from "tamagui";
import { Text } from "ui/typography/text";

import { useAcceptFriendRequest } from "./use_accept_friend_request/use_accept_friend_request";

import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

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
    <VStack className="border p-2 rounded-2xl">
      <HStack className="items-center gap-2">
        <UserAvatar avatarUrl={sender.profile?.avatarUrl || ""} size="$6" />
        <Text size="large" weight="semiBold" color="primary">
          {sender.profile?.name}
        </Text>
      </HStack>
      <HStack className="w-full items-center justify-center">
        <HStack className="gap-1 max-w-[120px] items-center justify-center">
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
        </HStack>
      </HStack>
    </VStack>
  );
};
