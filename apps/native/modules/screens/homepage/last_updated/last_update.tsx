import { Link, useRouter } from "expo-router";

import { mapGameStatusToLabel } from "@/modules/games_status/map_game_status_to_label";
import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";
import { HomepageSectionCarousel } from "@/modules/screens/homepage/homepage_section/homepage_section_carousel";
import { useLastEditedGames } from "@/modules/screens/homepage/last_updated/use_last_edited_games/use_last_edited_games";
import { truncateString } from "@/modules/strings/truncate_string";
import { SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { Button, ButtonText } from "@/ui/forms/button/button";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Box } from "@/ui/layout/box/box";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Image } from "@/ui/media_and_icons/image/image";
import { GText } from "@/ui/typography/text";

export const LastUpdatedGameStatus = () => {
  const lastEditedGames = useLastEditedGames();
  if (lastEditedGames.loading) {
    return <SkeletonText _lines={8} gap={3} className="h-4 w-full" />;
  }
  const data =
    lastEditedGames.data?.lastEditedGames.map((game) => ({
      gameStatusId: game.id,
      gameImage: game.cover?.bigUrl ?? "",
      gameTitle: game.name,
      gameStatus: mapGameStatusToLabel(game.status),
    })) ?? [];

  if (true) {
    return (
      <HomepageSection heading="Twoje ostatnie zmiany">
        <GText size="xl" className="text-center">
          Nie edytowałeś jeszcze żadnych gier.
        </GText>
        <Link asChild href="/(app)/(tabs)/(authorized)/games/games">
          <Button className="mt-4" onPress={() => {}}>
            <ButtonText>Przejdź do listy gier</ButtonText>
          </Button>
        </Link>
      </HomepageSection>
    );
  }
  return (
    <HomepageSection heading="Twoje ostatnie zmiany">
      <HomepageSectionCarousel
        data={data}
        renderItem={CurrentlyPlayingCarouselItem}
      />
    </HomepageSection>
  );
};

type CurrentlyPlayingCarouselItemProps = {
  item: {
    gameStatusId: number;
    gameImage: string;
    gameTitle: string;
    gameStatus: string;
  };
};

const CurrentlyPlayingCarouselItem = ({
  item,
}: CurrentlyPlayingCarouselItemProps) => {
  const router = useRouter();
  const onPress = () => {
    router.push(
      `/(app)/(authorized)/games_status/games_status_info/${item.gameStatusId}`,
    );
  };
  return (
    <Pressable onPress={onPress} className="bg-dark-700 h-[220px] rounded-xl">
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
    </Pressable>
  );
};
