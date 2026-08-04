import { useAuth0 } from "react-native-auth0";

import { useLastEditedGamesQuery } from "@/modules/screens/homepage/last_updated/use_last_edited_games/last_edited_games.generated";
export const useLastEditedGames = () => {
  const { user } = useAuth0();
  return useLastEditedGamesQuery({
    skip: !user,
    variables: {
      limit: 10,
    },
  });
};

export const useRefetchLastEditedGames = () => {
  const query = useLastEditedGames();

  const refetchLastEditedGames = async () => {
    await query.refetch();
  };

  return { refetchLastEditedGames };
};
