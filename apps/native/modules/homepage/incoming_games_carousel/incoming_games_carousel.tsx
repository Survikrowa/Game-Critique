import { Text, YStack, Image } from "tamagui";
import { Carousel } from "ui/data-display/carousel";

import { INCOMING_GAMES_MOCK } from "../../../mocks/incoming_games_mock";

export const IncomingGamesCarousel = () => {
  return (
    <Carousel
      data={INCOMING_GAMES_MOCK.filter((game) => game.game?.cover?.url)}
      renderItem={({ item }) => {
        return (
          <YStack width={128} height={192} marginRight={16} alignItems="center">
            <Image
              source={{
                width: 100,
                height: 120,
                uri: item.game?.cover?.url || "",
              }}
              width="100%"
              height="100%"
              borderRadius={8}
            />
            <Text textAlign="center">{item.game.name}</Text>
          </YStack>
        );
      }}
    />
  );
};
