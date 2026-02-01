import { ScrollView } from "tamagui";

import { FriendsSearchEmpty } from "./friends_search_empty";
import { FriendsSearchResult } from "./friends_search_result/friends_search_result";

import { VStack } from "@/ui/layout/vstack/vstack";

type FriendsSearchResultsProps = {
  users: User[];
};

type User = {
  oauthId: string;
  avatarUrl?: string;
  name?: string | null;
  isFriendRequestSent: boolean;
};

export const FriendsSearchResults = ({ users }: FriendsSearchResultsProps) => {
  if (users.length === 0) {
    return <FriendsSearchEmpty />;
  }
  return (
    <ScrollView maxHeight="90%" height="100%">
      <VStack className="gap-2">
        {users.map((user, index) => (
          <FriendsSearchResult
            key={user.oauthId}
            usersLength={users.length}
            name={user.name}
            oauthId={user.oauthId}
            avatarUrl={user.avatarUrl}
            currentIndex={index}
            isFriendRequestSent={user.isFriendRequestSent}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};
