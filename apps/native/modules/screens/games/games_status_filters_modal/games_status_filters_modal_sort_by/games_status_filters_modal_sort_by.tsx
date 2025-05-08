import { Controller } from "react-hook-form";

import { Select } from "../../../../../ui/forms/select";
import { useGamesStatusFiltersFormProvider } from "../use_games_status_filters_form/use_games_status_filters_form_provider";

type GamesStatusFiltersModalSortByProps = {
  items: SortOption[];
};

type SortOption = {
  field: string;
  order: string;
  label: string;
  id: string;
};

export const GamesStatusFiltersModalSortBy = ({
  items,
}: GamesStatusFiltersModalSortByProps) => {
  const mappedItems = items.map((item) => ({
    value: item.id,
    name: item.label,
  }));
  const { setValue, control } = useGamesStatusFiltersFormProvider();
  const handleSelect = (id: string) => {
    const selectedItem = items.find((item) => item.id === id);
    if (selectedItem) {
      setValue("sortBy", selectedItem.id);
      setValue("field", selectedItem.field);
      setValue("order", selectedItem.order);
    }
  };
  return (
    <Controller
      control={control}
      render={({ formState, field }) => {
        return (
          <Select
            placeholder=""
            label="Sortuj po"
            items={mappedItems}
            onChange={handleSelect}
            value={field.value}
            defaultValue={formState.defaultValues?.sortBy}
          />
        );
      }}
      name="sortBy"
    />
  );
};
