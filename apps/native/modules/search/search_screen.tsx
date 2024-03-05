import { useState } from "react";
import { Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";
import { useDebounce } from "use-debounce";

import { SearchInput } from "./search_input/search_input";
import { useSearch } from "./search_input/use_search/use_search";
import { SearchResults } from "./search_results/search_results";

type SearchScreenProps = {
  redirectTo: string;
};

export const SearchScreen = ({ redirectTo }: SearchScreenProps) => {
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 1000);

  const { loading, data } = useSearch({
    input: debouncedInput,
  });
  return (
    <YStack gap={6}>
      <Text size="large" weight="normal" color="primary">
        Wyszukiwarka
      </Text>
      <SearchInput onChange={(value) => setInput(value)} value={input} />
      <Text size="small" weight="normal" color="primary">
        Używając powyższej wyszukiwarki możesz znaleźć dowolną grą z naszej
        bazy.
      </Text>
      <YStack marginTop={8}>
        {loading && <Spinner size="large" />}
        {data && data.search.games.length > 0 && (
          <SearchResults results={data.search.games} redirectTo={redirectTo} />
        )}
      </YStack>
    </YStack>
  );
};
