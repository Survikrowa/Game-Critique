import { Controller } from "react-hook-form";

import { Select } from "../../../../../ui/forms/select";
import { useGamesStatusFiltersFormProvider } from "../use_games_status_filters_form/use_games_status_filters_form_provider";

type GamesStatusFiltersModalPlatformProps = {
  platforms: Platform[];
};

type Platform = {
  id: number;
  name: string;
};

type MappedPlatform = {
  name: string;
  value: string;
};

export const GamesStatusFiltersModalPlatform = ({
  platforms,
}: GamesStatusFiltersModalPlatformProps) => {
  const { control } = useGamesStatusFiltersFormProvider();
  const platformsOptions = platforms.map((platform) => ({
    name: platform.name,
    value: String(platform.id),
  }));
  return (
    <Controller
      control={control}
      render={({
        formState: { defaultValues },
        field: { onChange, value },
      }) => {
        return (
          <Select
            placeholder="Platforma"
            label="Platforma"
            items={applyDefaultValue(platformsOptions)}
            onChange={onChange}
            value={value}
            defaultValue={defaultValues?.platform}
          />
        );
      }}
      name="platform"
    />
  );
};

const applyDefaultValue = (platform: MappedPlatform[]) => {
  return [
    {
      value: "0",
      name: "Wszystkie",
    },
    ...platform,
  ];
};
