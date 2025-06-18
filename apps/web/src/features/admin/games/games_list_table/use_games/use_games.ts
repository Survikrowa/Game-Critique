import { useGamesQuery } from "@/features/admin/games/games_list_table/use_games/games.generated.ts";

type UseGamesArgs = {
  search: string;
  take: number;
  skip: number;
};

export const useGames = ({ search, skip, take }: UseGamesArgs) => {
  return useGamesQuery({
    search,
    take,
    skip,
  });
};
