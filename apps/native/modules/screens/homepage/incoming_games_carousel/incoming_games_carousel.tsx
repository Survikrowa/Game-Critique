import { Text, Image } from "tamagui";

import { INCOMING_GAMES_MOCK } from "@/mocks/incoming_games_mock";
import { Carousel } from "@/ui/data-display/carousel";
import { VStack } from "@/ui/layout/vstack/vstack";

export const IncomingGamesCarousel = () => {
  return (
    <Carousel
      itemWidth={128}
      data={INCOMING_GAMES_MOCK.filter((game) => game.game?.cover?.url)}
      renderItem={({ item }) => {
        return (
          <VStack className="w-32 h-48 m-4 items-center">
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
          </VStack>
        );
      }}
    />
  );
};
