import { Select } from "../../../../../ui/forms/select";

export const GamesStatusFiltersModalGameState = () => {
  return (
    <Select
      placeholder="Stan gry"
      label=""
      items={[{ value: "in-progress", name: "W trakcie" }]}
      onChange={() => null}
      value="in-progress"
    />
  );
};
