import { LinearGradient } from "expo-linear-gradient";
import { Image as RNImage, View } from "react-native";

import { formatReleaseDateToPolishLocale } from "@/modules/dates/date_to_polish_locale";
import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";
import { HomepageSectionCarousel } from "@/modules/screens/homepage/homepage_section/homepage_section_carousel";
import { IncomingGamesQuery } from "@/modules/screens/homepage/incoming_games_carousel/use_incoming_games/incoming_games.generated";
import { useIncomingGames } from "@/modules/screens/homepage/incoming_games_carousel/use_incoming_games/use_incoming_games";
import { truncateString } from "@/modules/strings/truncate_string";
import { Text } from "@/ui/typography/text";

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
    <View className="h-[220px] rounded-xl overflow-hidden bg-background-100">
      <RNImage
        source={{ uri: item.gameImage }}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.92)"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
        }}
      />
      <View className="absolute bottom-0 left-0 right-0 px-3 pb-3 gap-1">
        <Text size="medium" weight="bold" color="white">
          {truncateString(item.gameTitle, 22)}
        </Text>
        <Text size="small" weight="semiBold" color="secondary">
          {item.gameReleaseDate}
        </Text>
      </View>
    </View>
  );
};
