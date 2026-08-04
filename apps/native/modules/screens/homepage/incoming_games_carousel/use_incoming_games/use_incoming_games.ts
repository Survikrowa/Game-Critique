import { useAuth0 } from "react-native-auth0";

import { useIncomingGamesQuery } from "@/modules/screens/homepage/incoming_games_carousel/use_incoming_games/incoming_games.generated";

export const useIncomingGames = () => {
  const { user } = useAuth0();
  return useIncomingGamesQuery({
    skip: !user,
  });
};
