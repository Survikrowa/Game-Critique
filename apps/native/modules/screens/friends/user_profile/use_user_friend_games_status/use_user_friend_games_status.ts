import { useUserFriendGamesStatusQueryQuery } from "./user_friend_games_status.generated";
import { useGameStatusStore } from "../../../games/games_status_store/use_games_status_store";

type UseUserFriendGamesStatusArgs = {
  oauthId?: string;
};

export const useUserFriendGamesStatus = ({
  oauthId,
}: UseUserFriendGamesStatusArgs) => {
  const gamesStatusStore = useGameStatusStore((state) => ({
    filters: state.filters,
    sort: state.sort,
  }));
  const userQuery = useUserFriendGamesStatusQueryQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      oauthId: oauthId || "",
      take: 12,
      skip: 0,
      filters: {
        platform: gamesStatusStore.filters.platform,
      },
      status: gamesStatusStore.filters.status,
      search: gamesStatusStore.filters.search,
      sort: {
        field: gamesStatusStore.sort.field,
        order: gamesStatusStore.sort.order,
      },
    },
  });
  const fetchMoreGamesStatus = () => {
    if (userQuery.data?.userFriendGamesStatus.pagination.hasMore) {
      const newSkip = userQuery.data.userFriendGamesStatus.pagination.skip + 12;
      const take = userQuery.data.userFriendGamesStatus.pagination.take;

      userQuery.fetchMore({
        variables: {
          skip: newSkip,
          take,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            userFriendGamesStatus: {
              ...fetchMoreResult.userFriendGamesStatus,
              userGamesStatus: [
                ...prev.userFriendGamesStatus.userGamesStatus,
                ...fetchMoreResult.userFriendGamesStatus.userGamesStatus,
              ],
              pagination: {
                ...fetchMoreResult.userFriendGamesStatus.pagination,
                hasMore:
                  fetchMoreResult.userFriendGamesStatus.pagination.hasMore,
                skip: fetchMoreResult.userFriendGamesStatus.pagination.skip,
                take: fetchMoreResult.userFriendGamesStatus.pagination.take,
              },
            },
          };
        },
      });
    }
  };
  const onRefresh = () => {
    userQuery.refetch({
      skip: 0,
      take: 12,
    });
  };
  return { ...userQuery, fetchMoreGamesStatus, onRefresh };
};
