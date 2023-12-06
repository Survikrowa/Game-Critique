import { Text, YStack, Image } from "tamagui";

import { INCOMING_GAMES_MOCK } from "../../../mocks/incoming_games_mock";
import { Carousel } from "../../../ui/data-display/carousel";

const PLACEHOLDER =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const IncomingGamesCarousel = () => {
  return (
    <Carousel
      data={INCOMING_GAMES_MOCK}
      renderItem={({ item }) => {
        return (
          <YStack width={128} height={192} marginRight={16} alignItems="center">
            <Image
              source={{
                width: 100,
                height: 120,
                uri: item.game?.cover?.url || PLACEHOLDER,
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
