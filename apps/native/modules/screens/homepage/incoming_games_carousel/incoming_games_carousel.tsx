import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ExternalLink } from "lucide-react-native";
import { Image as RNImage, Pressable, View } from "react-native";

import { formatReleaseDateToPolishLocale } from "@/modules/dates/date_to_polish_locale";
import { useReminderAction } from "@/modules/release_reminders/use_reminder_action/use_reminder_action";
import { useCheckReminderStatus } from "@/modules/release_reminders/use_user_reminders/use_user_reminders";
import { HomepageSection } from "@/modules/screens/homepage/homepage_section/homepage_section";
import { HomepageSectionCarousel } from "@/modules/screens/homepage/homepage_section/homepage_section_carousel";
import { ReminderIcon } from "@/modules/screens/homepage/incoming_games_carousel/reminder_icon/reminder_icon";
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
    igdbId: parseInt(game.id, 10),
    gameUrl: game.url || "",
    rawReleaseDate: game.releaseDate,
  };
};

type IncomingGamesCarouselItemProps = {
  item: {
    gameTitle: string;
    gameReleaseDate: string;
    gameImage: string;
    igdbId: number;
    gameUrl: string;
    rawReleaseDate: string;
  };
};

const IncomingGamesCarouselItem = ({
  item,
}: IncomingGamesCarouselItemProps) => {
  const isReminded = useCheckReminderStatus(item.igdbId);
  const { addReminder, loadingAdd } = useReminderAction();

  const handleRemind = () => {
    if (isReminded) return;
    addReminder({
      igdbId: item.igdbId,
      gameName: item.gameTitle,
      gameUrl: item.gameUrl,
      releaseDate: item.rawReleaseDate,
    });
  };

  const handleOpenLink = () => {
    if (item.gameUrl) {
      router.push({ pathname: "/webview", params: { url: item.gameUrl } });
    }
  };

  return (
    <View className="h-[220px] overflow-hidden rounded-xl bg-background-100">
      <RNImage
        source={{ uri: item.gameImage }}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.92)"]}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
        }}
      />
      <View className="ml-1 mt-1 flex-row gap-2">
        <Pressable
          onPress={handleRemind}
          disabled={isReminded || loadingAdd}
          className="min-h-[44px] flex-row items-center gap-1 rounded-full bg-primary-500 px-4 py-1.5"
        >
          <ReminderIcon loadingAdd={loadingAdd} isReminded={isReminded} />
        </Pressable>
        {item.gameUrl ? (
          <Pressable
            onPress={handleOpenLink}
            className="min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-background-0/30 p-1.5"
          >
            <ExternalLink size={14} color="#fff" />
          </Pressable>
        ) : null}
      </View>
      <View className="absolute bottom-0 left-0 right-0 gap-1 px-3 pb-3">
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
