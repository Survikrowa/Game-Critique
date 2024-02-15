import { useUsersSearchQuery } from "./users_search_query.generated";

type UseGetUsersSearchArgs = {
  input: string;
};

export const useGetUsersSearch = ({ input }: UseGetUsersSearchArgs) => {
  return useUsersSearchQuery({
    fetchPolicy: "network-only",
    variables: {
      input,
    },
  });
};
