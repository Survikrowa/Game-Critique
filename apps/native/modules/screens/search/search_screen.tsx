import { ScrollView, Spinner } from "tamagui";
import { Text } from "ui/typography/text";

import { SearchInput } from "./search_input/search_input";
import { SearchResults } from "./search_results/search_results";
import { useSearchScreen } from "./use_search_screen";

import { VStack } from "@/ui/layout/vstack/vstack";

type SearchScreenProps = {
  redirectTo: string;
};

export const SearchScreen = ({ redirectTo }: SearchScreenProps) => {
  const { handleSearchInputChange, input, loading, data } = useSearchScreen();
  return (
    <VStack className="gap-1.5">
      <Text size="large" weight="normal" color="primary">
        Wyszukiwarka
      </Text>
      <SearchInput onChange={handleSearchInputChange} value={input} />
      <Text size="small" weight="normal" color="primary">
        Używając powyższej wyszukiwarki możesz znaleźć dowolną grą z naszej
        bazy.
      </Text>
      <VStack className="mt-2">
        {loading && <Spinner size="large" />}
        {data && data.search.games.length > 0 && (
          <ScrollView>
            <SearchResults
              results={data.search.games}
              redirectTo={redirectTo}
            />
          </ScrollView>
        )}
      </VStack>
    </VStack>
  );
};
