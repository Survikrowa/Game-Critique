import { useFriendsActivityQuery } from "./friends_activity.generated";

export const useFriendsActivity = () => {
  const friendsActivityQuery = useFriendsActivityQuery({
    fetchPolicy: "network-only",
  });

  const getFriendsActivity = () => {
    return friendsActivityQuery.data?.friendsActivity.flatMap(({ user }) => {
      if (user.activity[0]) {
        return {
          game: {
            status: user.activity[0].activityType,
            name: user.activity[0].game?.name || "",
            formattedUpdatedAt: user.activity[0].formattedUpdatedAt,
            cover: user.activity[0].game?.cover?.smallUrl,
          },
          ownerName: user.name,
        };
      }
      return [];
    });
  };

  return {
    friendsActivityQuery,
    getFriendsActivity,
  };
};
