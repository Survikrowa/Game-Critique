import { useFriendsActivityQuery } from "./friends_activity.generated";

export const useFriendsActivity = () => {
  return useFriendsActivityQuery({
    fetchPolicy: "network-only",
  });
};
