import { Controller } from "react-hook-form";

import { Select } from "../../../../../ui/forms/select";
import { useGamesStatusFiltersFormProvider } from "../use_games_status_filters_form/use_games_status_filters_form_provider";

export const GamesStatusFiltersModalAchievements = () => {
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
            placeholder="Osiągnięcia"
            label="Osiągnięcia"
            items={ACHIEVEMENTS_OPTIONS}
            onChange={onChange}
            value={value}
            defaultValue={defaultValues?.platform}
          />
        );
      }}
      name="achievementsCompleted"
    />
  );
};

const ACHIEVEMENTS_OPTIONS = [
  {
    name: "Wszystkie",
    value: "all",
  },
  {
    name: "Nie zdobyto wszystkich osiągnięć",
    value: "incomplete",
  },
  {
    name: "Zdobyto wszystkie osiągnięcia",
    value: "completed",
  },
];
