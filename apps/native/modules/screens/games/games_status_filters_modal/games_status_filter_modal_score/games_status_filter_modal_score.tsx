import { Controller } from "react-hook-form";

import { Select } from "../../../../../ui/forms/select";
import { useGamesStatusFiltersFormProvider } from "../use_games_status_filters_form/use_games_status_filters_form_provider";

export const GamesStatusFilterModalScore = () => {
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
            items={[]}
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
