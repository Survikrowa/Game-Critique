import { useState } from "react";
import { View } from "react-native";

import { FriendsRequestsEmpty } from "./friends_requests_empty/friends_requests_empty";
import { useFriendsRequests } from "./friends_requests_empty/use_friends_requests/use_friends_requests";
import { FriendsRequestsResults } from "./friends_requests_results/friends_requests_results";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";
import { pluralizePolish } from "@/modules/strings/pluralize";

const LoadingState = () => (
  <View className="p-4">
    <Skeleton style={{ width: 200, height: 20, marginBottom: 16 }} />
    {Array.from({ length: 3 }).map((_, i) => (
      <HStack key={i} className="mb-4 items-center gap-3">
        <Skeleton variant="circular" style={{ width: 44, height: 44 }} />
        <Skeleton style={{ flex: 1, height: 44, borderRadius: 12 }} />
      </HStack>
    ))}
  </View>
);

export const FriendsRequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const friendsRequestsQuery = useFriendsRequests();

  if (friendsRequestsQuery.loading || !friendsRequestsQuery.data) {
    return <LoadingState />;
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
    setRefreshing(false);
  };

  if (friendsRequests.length === 0) {
    return (
      <FriendsRequestsEmpty refreshing={refreshing} onRefresh={handleRefresh} />
    );
  }

  return (
    <View className="p-4">
      <Text size="large" weight="bold" color="primary">
        Masz{" "}
        {pluralizePolish(
          friendsRequests.length,
          "{} zaproszenie",
          "{} zaproszenia",
          "{} zaproszeń",
        )}{" "}
        do znajomych
      </Text>
      <FriendsRequestsResults friendsRequests={friendsRequests} />
    </View>
  );
};
