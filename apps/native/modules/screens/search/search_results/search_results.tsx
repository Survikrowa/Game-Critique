import { SearchResult } from "./search_result/search_result";
import { SearchGamesQuery } from "../search_input/use_search/search_query.generated";

import { VStack } from "@/ui/layout/vstack/vstack";

type SearchResultsProps = {
  results: SearchGamesQuery["search"]["games"];
  redirectTo: string;
};
export const SearchResults = ({ results, redirectTo }: SearchResultsProps) => {
  return (
    <VStack className="gap-2">
      {results.map((game) => (
        <SearchResult result={game} key={game.id} redirectTo={redirectTo} />
      ))}
    </VStack>
  );
};
