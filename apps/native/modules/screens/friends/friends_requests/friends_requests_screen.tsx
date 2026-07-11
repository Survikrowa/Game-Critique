import { ActivityIndicator } from "react-native";
import { useState } from "react";

import { FriendsRequestsEmpty } from "./friends_requests_empty/friends_requests_empty";
import { useFriendsRequests } from "./friends_requests_empty/use_friends_requests/use_friends_requests";
import { FriendsRequestsResults } from "./friends_requests_results/friends_requests_results";

import { ErrorState } from "@/ui/feedback/error_state/error_state";

export const FriendsRequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const friendsRequestsQuery = useFriendsRequests();

  if (friendsRequestsQuery.loading || !friendsRequestsQuery.data) {
    return <ActivityIndicator size="large" color="#3B82F6" />;
  }
  if (friendsRequestsQuery.error) {
    return (
      <ErrorState
        title="Błąd ładowania"
        description="Nie udało się załadować zaproszeń"
        onRetry={() => friendsRequestsQuery.refetch()}
      />
    );
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
