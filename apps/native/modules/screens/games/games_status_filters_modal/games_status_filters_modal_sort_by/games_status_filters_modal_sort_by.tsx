import { Select } from "../../../../../ui/forms/select";

export const GamesStatusFiltersModalSortBy = () => {
  return (
    <Select
      placeholder="Ostatnio dodane"
      label=""
      items={[{ value: "last-added", name: "Ostatnio dodane" }]}
      onChange={() => null}
      value="last-added"
    />
  );
};
