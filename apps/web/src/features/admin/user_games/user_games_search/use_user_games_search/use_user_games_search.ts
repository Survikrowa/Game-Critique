import { UserGamesSearchSchema } from "@/features/admin/user_games/user_games_search/use_user_games_search/user_games_search_schema.ts";
import { useZodForm } from "@/packages/forms/use_zod_form.ts";

export const useUserGamesSearch = () => {
  const form = useZodForm({
    schema: UserGamesSearchSchema,
    reValidateMode: "onChange",
    defaultValues: {
      oauthId: "",
    },
  });

  return {
    form,
  };
};
