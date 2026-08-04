import { ScrollView } from "react-native";

import { FriendsRequestsSender } from "./friends_requests_sender/friends_requests_sender";

import { VStack } from "@/ui/layout/vstack/vstack";

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
      <VStack className="gap-4">
        {friendsRequests.map((request) => (
          <FriendsRequestsSender
            key={request.senderOauthId}
            sender={{
              oauthId: request.senderOauthId,
              profile: request.senderProfile,
            }}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};
