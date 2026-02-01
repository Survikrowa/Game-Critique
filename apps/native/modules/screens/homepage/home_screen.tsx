import { useState } from "react";
import { RefreshControl } from "react-native-gesture-handler";
import { ScrollView } from "tamagui";
import { GText } from "ui/typography/text";

import { FriendsActivity } from "./friends_activity/friends_activity";
import { IncomingGamesCarousel } from "./incoming_games_carousel/incoming_games_carousel";

import { LastUpdatedGameStatus } from "@/modules/screens/homepage/last_updated/last_update";
import { useRefetchLastEditedGames } from "@/modules/screens/homepage/last_updated/use_last_edited_games/use_last_edited_games";
import { Box } from "@/ui/layout/box/box";
import { Divider } from "@/ui/layout/divider/divider";
import { VStack } from "@/ui/layout/vstack/vstack";

export const HomeScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { refetchLastEditedGames } = useRefetchLastEditedGames();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await refetchLastEditedGames();
    setIsRefreshing(false);
  };

  return (
    <>
      <Divider />
      <ScrollView
        maxHeight="95%"
        height="100%"
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isRefreshing} />
        }
      >
        <VStack className="gap-2">
          <VStack className="gap-2">
            <Box className="px-3">
              <LastUpdatedGameStatus />
            </Box>
            <Box className="px-3 mt-2">
              <IncomingGamesCarousel />
            </Box>
            <Box className="px-3 mt-2">
              <FriendsActivity />
            </Box>
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};
