import { useUserGamesStatusQueryQuery } from "./user_games_status_query.generated";
import { useGameStatusStore } from "../games_status_store/use_games_status_store";

export const useUserGamesStatus = ({ oauthId }: UseUserGamesStatusArgs) => {
  const gamesStatusStore = useGameStatusStore((state) => ({
    filters: state.filters,
    sort: state.sort,
  }));
  const userGamesStatusQuery = useUserGamesStatusQueryQuery({
    variables: {
      oauthId: oauthId || "",
      status: gamesStatusStore.filters.status,
      skip: 0,
      take: 12,
      search: gamesStatusStore.filters.search,
      filters: {
        platform: gamesStatusStore.filters.platform,
      },
      sort: {
        field: gamesStatusStore.sort.field,
        order: gamesStatusStore.sort.order,
      },
    },
  });

  const fetchMoreGamesStatus = () => {
    if (userGamesStatusQuery.data?.userGamesStatus.pagination.hasMore) {
      const newSkip =
        userGamesStatusQuery.data.userGamesStatus.pagination.skip + 12;
      const take = userGamesStatusQuery.data.userGamesStatus.pagination.take;

      userGamesStatusQuery.fetchMore({
        variables: {
          skip: newSkip,
          take,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          return {
            userGamesStatus: {
              ...fetchMoreResult.userGamesStatus,
              userGamesStatus: [
                ...prev.userGamesStatus.userGamesStatus,
                ...fetchMoreResult.userGamesStatus.userGamesStatus,
              ],
              pagination: {
                ...fetchMoreResult.userGamesStatus.pagination,
                hasMore: fetchMoreResult.userGamesStatus.pagination.hasMore,
                skip: fetchMoreResult.userGamesStatus.pagination.skip,
                take: fetchMoreResult.userGamesStatus.pagination.take,
              },
            },
          };
        },
      });
    }
  };

  const onRefresh = () => {
    userGamesStatusQuery.refetch({
      skip: 0,
      take: 12,
    });
  };

  return { ...userGamesStatusQuery, fetchMoreGamesStatus, onRefresh };
};

type UseUserGamesStatusArgs = {
  oauthId?: string;
};
