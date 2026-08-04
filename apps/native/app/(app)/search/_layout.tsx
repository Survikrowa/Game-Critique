import { Stack } from "expo-router";

import { GoBackHeader } from "../../../modules/layouts/go_back_header/go_back_header";

const SearchLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="search" options={{ headerShown: false }} />
      <Stack.Screen
        name="game/[game_id]/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="games_status_add_form/[hltb_id]/index"
        options={{
          header: ({ options: { title } }) => (
            <GoBackHeader text={title || ""} />
          ),
        }}
      />
    </Stack>
  );
};

export default SearchLayout;
