import { useUsersSearchQuery } from "./users_search_query.generated";

export const useGetUsersSearch = (
  variables: { input: string },
  options?: { skip?: boolean },
) => {
  return useUsersSearchQuery({
    variables,
    fetchPolicy: "network-only",
    ...options,
  });
};
