import { useCreateNewGamesStatus } from "./use_create_new_games_status/use_create_new_games_status";
import { GameInfoQuery } from "../game/use_get_game_info/game_info.generated";
import { GamesStatusForm } from "../games_status_form/games_status_form";

type GamesStatusAddFormProps = {
  game: GameInfoQuery["game"];
};
export const GamesStatusAddForm = ({ game }: GamesStatusAddFormProps) => {
  const [createNewGamesStatus] = useCreateNewGamesStatus();
  return (
    <GamesStatusForm
      game={game}
      onSuccessSubmit={async (data) => {
        const { errors } = await createNewGamesStatus({
          variables: {
            input: {
              achievementsCompleted: data.platinium,
              completedIn: {
                hours: data.hours,
                minutes: data.minutes,
                seconds: data.seconds,
              },
              score: data.score,
              gameStatus: data.status,
              platformId: Number(data.platform),
              gameId: game.id,
            },
          },
        });
        return {
          submitFailed: Boolean(errors && errors.length > 0),
        };
      }}
    />
  );
};
