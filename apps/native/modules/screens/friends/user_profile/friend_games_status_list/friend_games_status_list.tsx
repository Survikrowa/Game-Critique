import { FriendGamesStatusListItem } from "./friend_games_status_list_item/friend_games_status_list_item";
import { GameStatus } from "../../../../../__generated__/types";
import { GamesStatusGrid } from "../../../games/games_status_list/games_status_grid/games_status_grid";

type FriendGamesStatusListProps = {
  oauthId: string;
  items: Item[];
  onRefresh: () => void;
  loading: boolean;
  onEndReached: () => void;
};

type Item = {
  id: number;
  title: string;
  platform: string;
  status: GameStatus;
  score: string;
  cover: string;
};

export const FriendGamesStatusList = ({
  oauthId,
  items,
  onRefresh,
  loading,
  onEndReached,
}: FriendGamesStatusListProps) => {
  return (
    <GamesStatusGrid
      items={items}
      loading={loading}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      emptyTitle="Brak gier"
      emptyDescription="Ten użytkownik nie dodał jeszcze żadnych gier"
      renderItem={(item) => (
        <FriendGamesStatusListItem item={item} oauthId={oauthId} />
      )}
    />
  );
};
