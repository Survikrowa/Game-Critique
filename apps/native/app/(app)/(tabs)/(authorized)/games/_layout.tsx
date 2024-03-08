import { Stack } from "expo-router";

import { GoBackHeader } from "../../../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../../../modules/layouts/header/header";

const GamesLayout = () => {
  return (
    <Stack initialRouteName="games">
      <Stack.Screen
        name="games"
        options={{
          header: Header,
        }}
      />

      <Stack.Screen
        name="games_status_edit_form/[game_status_id]"
        options={{
          header: () => <GoBackHeader text="Edycja statusu" />,
        }}
      />
      <Stack.Screen
        name="games_status_add_form/[hltb_id]/index"
        options={{
          header: () => <GoBackHeader text="Dodajesz: " />,
        }}
      />
      <Stack.Screen
        name="games_status_info/[games_status_id]"
        options={{
          header: () => <GoBackHeader text="NAZWA GRY" />,
        }}
      />
      <Stack.Screen
        name="games_search"
        options={{
          header: () => <GoBackHeader text="Znajdź grę" />,
        }}
      />
      <Stack.Screen
        name="game/[game_id]"
        options={{
          header: () => <GoBackHeader text="NAZWA GRY" />,
        }}
      />
      <Stack.Screen
        name="(game_status_reviews)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default GamesLayout;
