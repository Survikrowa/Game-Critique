import { GamesStatusGrid } from "./games_status_grid/games_status_grid";
import { GamesStatusListItem } from "./games_status_list_item/games_status_list_item";
import { GameStatus } from "../../../../__generated__/types";

type GamesStatusListProps = {
  items: Item[];
  onRefresh: () => void;
  loading: boolean;
  onEndReached: () => void;
};

type Item = {
  id: number;
  gameId: number;
  title: string;
  platform: string;
  platformId: number;
  status: GameStatus;
  score: string;
  cover: string;
  achievementsCompleted: boolean;
};

export const GamesStatusList = ({
  items,
  onRefresh,
  loading,
  onEndReached,
}: GamesStatusListProps) => {
  return (
    <GamesStatusGrid
      items={items}
      loading={loading}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      renderItem={(item) => <GamesStatusListItem item={item} />}
    />
  );
};
