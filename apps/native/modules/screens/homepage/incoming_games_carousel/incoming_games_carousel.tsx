import { formatReleaseDateToPolishLocale } from "@/modules/dates/date_to_polish_locale";
import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";
import { HomepageSectionCarousel } from "@/modules/screens/homepage/homepage_section/homepage_section_carousel";
import { IncomingGamesQuery } from "@/modules/screens/homepage/incoming_games_carousel/use_incoming_games/incoming_games.generated";
import { useIncomingGames } from "@/modules/screens/homepage/incoming_games_carousel/use_incoming_games/use_incoming_games";
import { truncateString } from "@/modules/strings/truncate_string";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Image } from "@/ui/media_and_icons/image/image";
import { GText } from "@/ui/typography/text";

export const IncomingGamesCarousel = () => {
  const { data } = useIncomingGames();
  const games = data?.upcomingGames.map(mapIncomingGame);

  if (!games || games?.length === 0) {
    return null;
  }
  return (
    <HomepageSection heading="Nadchodzące gry">
      <HomepageSectionCarousel
        renderItem={IncomingGamesCarouselItem}
        data={games}
      />
    </HomepageSection>
  );
};

const mapIncomingGame = (game: IncomingGamesQuery["upcomingGames"][number]) => {
  return {
    gameTitle: game.name,
    gameReleaseDate: formatReleaseDateToPolishLocale(game.releaseDate),
    gameImage: game.coverUrl || game.backgroundUrl || "",
  };
};

type IncomingGamesCarouselItemProps = {
  item: {
    gameTitle: string;
    gameReleaseDate: string;
    gameImage: string;
  };
};

const IncomingGamesCarouselItem = ({
  item,
}: IncomingGamesCarouselItemProps) => {
  return (
    <VStack className="flex flex-col h-full relative">
      <Image
        alt={item.gameTitle}
        source={{ uri: item.gameImage }}
        className="w-full h-full object-cover rounded-xl"
        resizeMode="cover"
      />
      <VStack
        className="flex flex-col justify-between pl-2 pr-2 pb-2 absolute bottom-0 outline"
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
          {item.gameReleaseDate}
        </GText>
      </VStack>
    </VStack>
  );
};
