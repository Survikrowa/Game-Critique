import { Button, ScrollView, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { FriendsRequestsSender } from "./friends_requests_sender/friends_requests_sender";
import { UserAvatar } from "../../../../profile/user_avatar/user_avatar";
import { pluralizePolish } from "../../../../strings/pluralize";

type FriendsRequestsResultsProps = {
  friendsRequests: FriendRequest[];
};

type FriendRequest = {
  senderOauthId: string;
  senderProfile?: {
    name?: string | null;
    avatarUrl: string;
  } | null;
};
export const FriendsRequestsResults = ({
  friendsRequests,
}: FriendsRequestsResultsProps) => {
  return (
    <ScrollView>
      <YStack gap={32}>
        <Text size="large" weight="bold" color="primary">
          {pluralizePolish(
            friendsRequests.length,
            "Poniższy",
            "Poniższi",
            "Poniższi",
          )}{" "}
          {pluralizePolish(
            friendsRequests.length,
            "użytkownik",
            "użytkownicy",
            "użytkownicy",
          )}{" "}
          {pluralizePolish(friendsRequests.length, "chcę", "chcą", "chcą")} się
          z Tobą zaprzyjaźnić:
        </Text>
        {friendsRequests.map((request) => (
          <FriendsRequestsSender
            key={request.senderOauthId}
            sender={{
              oauthId: request.senderOauthId,
              profile: request.senderProfile,
            }}
          />
        ))}
      </YStack>
    </ScrollView>
  );
};
