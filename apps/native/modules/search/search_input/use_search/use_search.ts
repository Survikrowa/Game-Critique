import { useSearchGamesQuery } from "./search_query.generated";

type UseSearchArgs = {
  input: string;
};

export const useSearch = ({ input }: UseSearchArgs) => {
  return useSearchGamesQuery({
    variables: {
      search: input,
    },
  });
};
