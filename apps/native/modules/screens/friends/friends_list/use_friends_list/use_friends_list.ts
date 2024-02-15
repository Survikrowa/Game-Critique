import { useFriendsListQuery } from "./friends_list_query.generated";

export const useFriendsList = () => {
  return useFriendsListQuery({
    fetchPolicy: "network-only",
  });
};
