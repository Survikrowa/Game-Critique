import { useFormContext } from "react-hook-form";

import { GamesStatusFiltersFormSchemaType } from "./games_status_filters_form_schema";

export const useGamesStatusFiltersFormProvider = () =>
  useFormContext<GamesStatusFiltersFormSchemaType>();
