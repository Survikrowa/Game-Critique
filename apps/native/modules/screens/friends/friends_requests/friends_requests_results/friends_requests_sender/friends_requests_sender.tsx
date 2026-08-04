import { Text } from "@/ui/typography/text";

import { useAcceptFriendRequest } from "./use_accept_friend_request/use_accept_friend_request";
import { useRejectFriendRequest } from "./use_reject_friend_request/use_reject_friend_request";
import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { Button, ButtonText } from "@/ui/forms/button/button";
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
  const [acceptFriendRequest, { loading: acceptLoading }] =
    useAcceptFriendRequest();
  const [rejectFriendRequest, { loading: rejectLoading }] =
    useRejectFriendRequest();

  const handleAccept = () => {
    acceptFriendRequest({ variables: { senderOauthId: sender.oauthId } });
  };

  const handleReject = () => {
    rejectFriendRequest({ variables: { senderOauthId: sender.oauthId } });
  };

  const isDisabled = acceptLoading || rejectLoading;

  return (
    <VStack className="gap-4 rounded-2xl border border-outline-0 bg-background-0 p-4">
      <HStack className="items-center gap-3">
        <UserAvatar avatarUrl={sender.profile?.avatarUrl || ""} size="$6" />
        <Text size="large" weight="semiBold" color="primary">
          {sender.profile?.name}
        </Text>
      </HStack>
      <HStack className="justify-end gap-2">
        <Button
          action="secondary"
          variant="outline"
          isDisabled={isDisabled}
          onPress={handleReject}
        >
          <ButtonText>Odrzuć</ButtonText>
        </Button>
        <Button action="primary" isDisabled={isDisabled} onPress={handleAccept}>
          <ButtonText>Dodaj</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};
