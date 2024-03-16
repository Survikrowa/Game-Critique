import { router } from "expo-router";
import { Image, XStack, YStack } from "tamagui";
import { Text } from "ui/typography/text";

import { SearchGamesQuery } from "../../search_input/use_search/search_query.generated";

type SearchResultProps = {
  result: SearchGamesQuery["search"]["games"][number];
  redirectTo: string;
};
export const SearchResult = ({ result, redirectTo }: SearchResultProps) => {
  return (
    <XStack
      onPress={() => router.push(`${redirectTo}/${result.id}`)}
      gap={8}
      maxWidth="100%"
    >
      <XStack maxWidth={80} maxHeight={100}>
        <Image
          source={{
            uri: result.cover.small_url,
          }}
          width={80}
          height={100}
          resizeMode="contain"
          borderRadius={4}
        />
      </XStack>
      <YStack maxWidth={220}>
        <Text size="medium" weight="semiBold" color="primary">
          {result.name}
        </Text>
      </YStack>
    </XStack>
  );
};
