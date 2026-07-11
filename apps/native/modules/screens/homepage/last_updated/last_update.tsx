import { Link, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Image as RNImage, View } from "react-native";
import { useAuth0 } from "react-native-auth0";

import { mapGameStatusToLabel } from "@/modules/games_status/map_game_status_to_label";
import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";
import { HomepageSectionCarousel } from "@/modules/screens/homepage/homepage_section/homepage_section_carousel";
import { useLastEditedGames } from "@/modules/screens/homepage/last_updated/use_last_edited_games/use_last_edited_games";
import { truncateString } from "@/modules/strings/truncate_string";
import { SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { Button, ButtonText } from "@/ui/forms/button/button";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Box } from "@/ui/layout/box/box";
import { Text } from "@/ui/typography/text";

export const LastUpdatedGameStatus = () => {
  const { user } = useAuth0();
  const lastEditedGames = useLastEditedGames();

  if (!user) {
    return (
      <HomepageSection heading="Twoje ostatnie zmiany">
        <Text size="medium" weight="normal" color="secondary">
          Zaloguj się, aby zobaczyć swoje gry.
        </Text>
        <Link asChild href="/(app)/auth">
          <Button className="mt-4" onPress={() => {}}>
            <ButtonText>Zaloguj się</ButtonText>
          </Button>
        </Link>
      </HomepageSection>
    );
  }

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

  if (data.length === 0) {
    return (
      <HomepageSection heading="Twoje ostatnie zmiany">
        <Text size="medium" weight="normal" color="secondary">
          Nie edytowałeś jeszcze żadnych gier.
        </Text>
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
    <Pressable
      onPress={onPress}
      className="bg-background-100 h-[220px] rounded-xl overflow-hidden"
    >
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
        <Text size="small" weight="normal" color="active">
          {item.gameStatus}
        </Text>
      </View>
    </Pressable>
  );
};
