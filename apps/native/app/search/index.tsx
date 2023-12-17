import { gql, useQuery } from "@apollo/client";
import { Search } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Input, Spinner, XStack, YStack } from "tamagui";

import { Text } from "../../ui/typography/text";

const SEARCH_GAMES = gql`
  query SearchGames($search: String!) {
    search(input: $search) {
      games {
        id
        name
        cover {
          url
        }
      }
    }
  }
`;

const SearchPage = () => {
  const [input, setInput] = useState("");
  const { loading, data, error } = useQuery(SEARCH_GAMES, {
    variables: { search: input },
  });
  return (
    <YStack padding={8} gap={6}>
      <Text size="large" weight="normal" color="secondary">
        Wyszukiwarka
      </Text>
      <XStack
        paddingHorizontal={8}
        width="100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Input
          placeholder="Wyszukaj"
          value={input}
          borderRadius={8}
          borderColor="$purple8"
          borderWidth={1}
          borderTopWidth={0}
          borderLeftWidth={0}
          borderRightWidth={0}
          overflow="hidden"
          onChangeText={(value) => setInput(value)}
          width="100%"
        />
        <Search />
      </XStack>

      <Text size="small" weight="normal" color="secondary">
        Używając powyższego inputa możesz wyszukać dowolną grą z naszej bazy.
      </Text>
      <YStack>
        {loading ? (
          <Spinner />
        ) : (
          data.search.games.map((game) => <Text>{game.name}</Text>)
        )}
      </YStack>
    </YStack>
  );
};

export default SearchPage;
