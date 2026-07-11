import { ActivityIndicator } from "react-native";
import { Text } from "ui/typography/text";

import { useAcceptFriendRequest } from "./use_accept_friend_request/use_accept_friend_request";

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
  const [acceptFriendRequest, { loading }] = useAcceptFriendRequest();

  const handleConfirmButton = () => {
    acceptFriendRequest({ variables: { senderOauthId: sender.oauthId } });
  };
  return (
    <VStack className="border border-outline-0 p-2 rounded-2xl">
      <HStack className="items-center gap-2">
        <UserAvatar avatarUrl={sender.profile?.avatarUrl || ""} size="$6" />
        <Text size="large" weight="semiBold" color="primary">
          {sender.profile?.name}
        </Text>
      </HStack>
      <HStack className="w-full items-center justify-center">
        <HStack className="gap-1 max-w-[120px] items-center justify-center">
          <Button action="secondary">
            <ButtonText>Odrzuć</ButtonText>
          </Button>
          <Button
            action="primary"
            onPress={handleConfirmButton}
            isDisabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <ButtonText>Dodaj</ButtonText>
            )}
          </Button>
        </HStack>
      </HStack>
    </VStack>
  );
};
