import { ScrollView } from "tamagui";
import { GText, Text } from "ui/typography/text";

import { FriendsActivity } from "./friends_activity/friends_activity";
import { IncomingGamesCarousel } from "./incoming_games_carousel/incoming_games_carousel";

import { VStack } from "@/ui/layout/vstack/vstack";

export const HomeScreen = () => {
  return (
    <ScrollView maxHeight="95%" height="100%">
      <VStack className="gap-2">
        <VStack className="gap-2">
          <GText size="lg" bold>
            Nadchodzące premiery
          </GText>
          <IncomingGamesCarousel />
        </VStack>
        <FriendsActivity />
      </VStack>
    </ScrollView>
  );
};
