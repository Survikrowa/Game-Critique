import { FormProvider } from "react-hook-form";

import { GamesStatusFiltersModalAchievements } from "./games_status_filters_modal_achievements/games_status_filters_modal_achievements";
import { GamesStatusFiltersModalGameState } from "./games_status_filters_modal_game_state/games_status_filters_modal_game_state";
import { GamesStatusFiltersModalPlatform } from "./games_status_filters_modal_platform/games_status_filters_modal_platform";
import { GamesStatusFiltersModalSection } from "./games_status_filters_modal_section/games_status_filters_modal_section";
import { GamesStatusFiltersModalSortBy } from "./games_status_filters_modal_sort_by/games_status_filters_modal_sort_by";
import { useGamesStatusFiltersForm } from "./use_games_status_filters_form/use_games_status_filters_form";
import { useGetGamesStatusFilters } from "../use_get_games_status_filters/use_get_games_status_filters";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { SkeletonText } from "@/ui/feedback/skeleton/skeleton";
import { VStack } from "@/ui/layout/vstack/vstack";

export const GamesStatusFiltersModal = () => {
  const { data, loading } = useGetGamesStatusFilters();
  const { form, handleSubmit } = useGamesStatusFiltersForm();
  if (loading || !data) {
    return (
      <VStack className="flex-1 items-center justify-center gap-4 p-4">
        <SkeletonText _lines={8} gap={3} className="h-4 w-full" />
      </VStack>
    );
  }
  return (
    <VStack className="flex-1">
      <FormProvider {...form}>
        <VStack className="gap-8">
          <VStack className="gap-2">
            <GamesStatusFiltersModalSection title="Sortuj po">
              <GamesStatusFiltersModalSortBy
                items={data.gamesStatusSortOptions.sortOptions}
              />
            </GamesStatusFiltersModalSection>
            <GamesStatusFiltersModalSection title="Stan gry">
              <GamesStatusFiltersModalGameState
                items={
                  data.availableGamesStatusProgressStates
                    .gameStatusProgressState
                }
              />
            </GamesStatusFiltersModalSection>
            <GamesStatusFiltersModalSection title="Platforma">
              <GamesStatusFiltersModalPlatform
                platforms={data.platforms.platforms}
              />
            </GamesStatusFiltersModalSection>
            <GamesStatusFiltersModalSection title="Osiągnięcia">
              <GamesStatusFiltersModalAchievements />
            </GamesStatusFiltersModalSection>
          </VStack>

          <Button action="primary" className="mt-4" onPress={handleSubmit}>
            <ButtonText>Zaaplikuj filtry</ButtonText>
          </Button>
        </VStack>
      </FormProvider>
    </VStack>
  );
};
