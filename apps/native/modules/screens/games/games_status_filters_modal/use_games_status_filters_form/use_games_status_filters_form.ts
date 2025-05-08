import { useRouter } from "expo-router";

import { GamesStatusFiltersFormSchema } from "./games_status_filters_form_schema";
import { useZodForm } from "../../../../forms/use_zod_form/use_zod_form";
import { useGameStatusStore } from "../../games_status_store/use_games_status_store";

export const useGamesStatusFiltersForm = () => {
  const gameStatusStore = useGameStatusStore((state) => ({
    sort: state.sort,
    filters: state.filters,
    updateFilters: state.updateFilters,
  }));
  const setPagination = useGameStatusStore((state) => state.setPagination);
  const form = useZodForm({
    schema: GamesStatusFiltersFormSchema,
    defaultValues: {
      sortBy: gameStatusStore.sort.sortBy,
      field: gameStatusStore.sort.field,
      gameStatus: gameStatusStore.filters.status,
      platform: gameStatusStore.filters.platform,
      order: gameStatusStore.sort.order,
      achievementsCompleted: gameStatusStore.filters.achievementsCompleted,
    },
  });
  const router = useRouter();

  const setSort = useGameStatusStore((state) => state.setSort);

  const handleSubmit = form.handleSubmit((data) => {
    setSort(data.sortBy, data.field, data.order);
    gameStatusStore.updateFilters({
      status: data.gameStatus,
      platform: data.platform,
      achievementsCompleted: data.achievementsCompleted,
    });
    setPagination({
      skip: 0,
      take: 9,
    });
    router.back();
  });

  return {
    form,
    handleSubmit,
  };
};
