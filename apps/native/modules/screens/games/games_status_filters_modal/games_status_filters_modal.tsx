import { Button, Form, YStack } from "tamagui";

import { GamesStatusFiltersModalGameState } from "./games_status_filters_modal_game_state/games_status_filters_modal_game_state";
import { GamesStatusFiltersModalSection } from "./games_status_filters_modal_section/games_status_filters_modal_section";
import { GamesStatusFiltersModalSortBy } from "./games_status_filters_modal_sort_by/games_status_filters_modal_sort_by";

export const GamesStatusFiltersModal = () => {
  return (
    <YStack flex={1}>
      <Form gap={32} onSubmit={() => console.log("form")}>
        <YStack gap={8}>
          <GamesStatusFiltersModalSection title="Sortuj po">
            <GamesStatusFiltersModalSortBy />
          </GamesStatusFiltersModalSection>
          <GamesStatusFiltersModalSection title="Stan gry">
            <GamesStatusFiltersModalGameState />
          </GamesStatusFiltersModalSection>
        </YStack>

        <Button
          theme="active"
          backgroundColor="black"
          color="white"
          borderColor="white"
        >
          Zaaplikuj filtry
        </Button>
      </Form>
    </YStack>
  );
};
