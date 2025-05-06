import { Controller } from "react-hook-form";

import { GameStatus } from "../../../../../__generated__/types";
import { Select } from "../../../../../ui/forms/select";
import { useGamesStatusFiltersFormProvider } from "../use_games_status_filters_form/use_games_status_filters_form_provider";

type GamesStatusFiltersModalGameStateProps = {
  items: {
    value: GameStatus;
    label: string;
  }[];
};

export const GamesStatusFiltersModalGameState = ({
  items,
}: GamesStatusFiltersModalGameStateProps) => {
  const mappedItems = items.map((item) => ({
    value: item.value,
    name: item.label,
  }));
  const { control } = useGamesStatusFiltersFormProvider();
  return (
    <Controller
      control={control}
      render={({
        formState: { defaultValues },
        field: { onChange, value },
      }) => {
        return (
          <Select
            placeholder="Stan gry"
            label="Stan gry"
            items={mappedItems}
            onChange={onChange}
            value={value}
            defaultValue={defaultValues?.gameStatus}
          />
        );
      }}
      name="gameStatus"
    />
  );
};
