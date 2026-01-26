import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";
import { HomepageSectionCarousel } from "@/modules/screens/homepage/homepage_section/homepage_section_carousel";
import { truncateString } from "@/modules/strings/truncate_string";
import { Box } from "@/ui/layout/box/box";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Image } from "@/ui/media_and_icons/image/image";
import { GText } from "@/ui/typography/text";
const sampleData = [
  {
    gameImage: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
    gameTitle: "Hades",
    gameStatus: "W trakcie",
  },
  {
    gameImage: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
    gameTitle: "Cyberpunk 2077Cyberpunk 2077",
    gameStatus: "Ukończona",
  },
  {
    gameImage: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
    gameTitle: "Gra 3",
    gameStatus: "Porzucona",
  },
  {
    gameImage: "https://howlongtobeat.com/games/62941_Hades.jpg?width=760",
    gameTitle: "Gra 4",
    gameStatus: "Backlog",
  },
];

export const LastUpdatedGameStatus = () => {
  return (
    <HomepageSection heading="Twoje ostatnie zmiany">
      <HomepageSectionCarousel
        data={sampleData}
        renderItem={CurrentlyPlayingCarouselItem}
      />
    </HomepageSection>
  );
};

type CurrentlyPlayingCarouselItemProps = {
  item: {
    gameImage: string;
    gameTitle: string;
    gameStatus: string;
  };
};

const CurrentlyPlayingCarouselItem = ({
  item,
}: CurrentlyPlayingCarouselItemProps) => {
  return (
    <Box className="bg-dark-700 h-[220px] rounded-xl">
      <VStack className="flex flex-col h-full relative">
        <Image
          alt={item.gameTitle}
          source={{ uri: item.gameImage }}
          className="w-full h-full object-cover rounded-xl"
          resizeMode="cover"
        />
        <VStack
          className="flex flex-col justify-between pl-2 pr-2 pb-2 absolute bottom-0 outline
          "
          space="md"
        >
          <GText
            bold
            size="xl"
            className="text-start shadow-outline-50"
            style={{
              textShadowColor: "black",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 1,
            }}
          >
            {truncateString(item.gameTitle, 15)}
          </GText>
          <GText
            bold
            size="lg"
            className="text-start"
            style={{
              textShadowColor: "black",
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 1,
            }}
          >
            {item.gameStatus}
          </GText>
        </VStack>
      </VStack>
    </Box>
  );
};
