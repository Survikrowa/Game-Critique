import { ScrollView, Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { SearchInput } from "./search_input/search_input";
import { SearchResults } from "./search_results/search_results";
import { useSearchScreen } from "./use_search_screen";

type SearchScreenProps = {
  redirectTo: string;
};

export const SearchScreen = ({ redirectTo }: SearchScreenProps) => {
  const { handleSearchInputChange, input, loading, data } = useSearchScreen();
  return (
    <YStack gap={6}>
      <Text size="large" weight="normal" color="primary">
        Wyszukiwarka
      </Text>
      <SearchInput onChange={handleSearchInputChange} value={input} />
      <Text size="small" weight="normal" color="primary">
        Używając powyższej wyszukiwarki możesz znaleźć dowolną grą z naszej
        bazy.
      </Text>
      <YStack marginTop={8}>
        {loading && <Spinner size="large" />}
        {data && data.search.games.length > 0 && (
          <ScrollView>
            <SearchResults
              results={data.search.games}
              redirectTo={redirectTo}
            />
          </ScrollView>
        )}
      </YStack>
    </YStack>
  );
};
