import { ScrollView } from "tamagui";
import { GText } from "ui/typography/text";

import { FriendsActivity } from "./friends_activity/friends_activity";
import { IncomingGamesCarousel } from "./incoming_games_carousel/incoming_games_carousel";

import { LastUpdatedGameStatus } from "@/modules/screens/homepage/last_updated/last_update";
import { Box } from "@/ui/layout/box/box";
import { Divider } from "@/ui/layout/divider/divider";
import { VStack } from "@/ui/layout/vstack/vstack";

export const HomeScreen = () => {
  return (
    <>
      <Divider />
      <ScrollView maxHeight="95%" height="100%">
        <VStack className="gap-2">
          <VStack className="gap-2">
            <Box className="px-3">
              <LastUpdatedGameStatus />
            </Box>
            <GText size="lg" bold className="text-white">
              Nadchodzące premiery
            </GText>
            <IncomingGamesCarousel />
          </VStack>
          <FriendsActivity />
        </VStack>
      </ScrollView>
    </>
  );
};
