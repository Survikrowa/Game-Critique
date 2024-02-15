import { useFriendsRequestsQuery } from "./friends_requests_query.generated";

export const useFriendsRequests = () => {
  return useFriendsRequestsQuery({
    fetchPolicy: "network-only",
  });
};
