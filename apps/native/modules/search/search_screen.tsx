import { useState } from "react";
import { Spinner, YStack } from "tamagui";

import { SearchInput } from "./search_input/search_input";
import { useSearch } from "./search_input/use_search/use_search";
import { Text } from "../../ui/typography/text";

export const SearchScreen = () => {
  const [input, setInput] = useState("");

  const { loading, data, error } = useSearch({
    input,
  });
  return (
    <YStack padding={8} gap={6}>
      <Text size="large" weight="normal" color="secondary">
        Wyszukiwarka
      </Text>
      <SearchInput onChange={(value) => setInput(value)} value={input} />
      <Text size="small" weight="normal" color="secondary">
        Używając powyższego inputa możesz wyszukać dowolną grą z naszej bazy.
      </Text>
      <YStack>
        {loading ? (
          <Spinner />
        ) : (
          data?.search.games.map((game) => (
            <Text size="medium" color="secondary" weight="normal" key={game.id}>
              {game.name}
            </Text>
          ))
        )}
      </YStack>
    </YStack>
  );
};
