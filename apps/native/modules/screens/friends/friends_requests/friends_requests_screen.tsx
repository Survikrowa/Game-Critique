import { useState } from "react";
import { Spinner } from "tamagui";

import { FriendsRequestsEmpty } from "./friends_requests_empty/friends_requests_empty";
import { useFriendsRequests } from "./friends_requests_empty/use_friends_requests/use_friends_requests";
import { FriendsRequestsResults } from "./friends_requests_results/friends_requests_results";

export const FriendsRequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const friendsRequestsQuery = useFriendsRequests();

  if (
    friendsRequestsQuery.loading ||
    friendsRequestsQuery.error ||
    !friendsRequestsQuery.data
  ) {
    return <Spinner size="large" />;
  }
  const friendsRequests = friendsRequestsQuery.data.friendsRequests.map(
    (request) => ({
      senderOauthId: request.senderOauthId,
      senderProfile: request.senderProfile,
    }),
  );
  const handleRefresh = async () => {
    setRefreshing(true);
    await friendsRequestsQuery.refetch();
  };
  if (friendsRequestsQuery.data.friendsRequests.length === 0) {
    return (
      <FriendsRequestsEmpty refreshing={refreshing} onRefresh={handleRefresh} />
    );
  }
  return <FriendsRequestsResults friendsRequests={friendsRequests} />;
};
