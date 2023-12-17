import { YStack } from "tamagui";

import { SearchResult } from "./search_result/search_result";
import { SearchGamesQuery } from "../search_input/use_search/search_query.generated";

type SearchResultsProps = {
  results: SearchGamesQuery["search"]["games"];
};
export const SearchResults = ({ results }: SearchResultsProps) => {
  return (
    <YStack gap={8}>
      {results.map((game) => (
        <SearchResult result={game} key={game.id} />
      ))}
    </YStack>
  );
};
