import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { useToastController } from "ui/feedback/toast/use_toast_controller";

import {
  GamesStatusAddFormFields,
  GamesStatusAddFormSchema,
} from "./games_status_form_schema";
import { useUpsertGameStatus } from "./use_upsert_game_status/use_upsert_game_status";
import { GameStatus } from "../../../__generated__/types";
import { GameInfoQuery } from "../../screens/game/use_get_game_info/game_info.generated";

export const DEFAULT_VALUES = {
  hours: "",
  minutes: "",
  seconds: "",
  platform: "",
  score: "",
  status: undefined,
  review: "",
  platinium: false,
};

export type InitialValues = {
  hours?: string;
  minutes?: string;
  seconds?: string;
  platform: string;
  score?: string | null;
  status: GameStatus;
  review?: string | null;
  platinium?: boolean;
};

const getInitialValues = (initialValues?: InitialValues) => {
  if (!initialValues) return DEFAULT_VALUES;
  return {
    hours: initialValues?.hours || DEFAULT_VALUES.hours,
    minutes: initialValues?.minutes || DEFAULT_VALUES.minutes,
    seconds: initialValues?.seconds || DEFAULT_VALUES.seconds,
    platform: initialValues.platform,
    score: initialValues.score || DEFAULT_VALUES.score,
    status: initialValues.status,
    review: initialValues.review || DEFAULT_VALUES.review,
    platinium: initialValues.platinium || DEFAULT_VALUES.platinium,
  };
};

type UseGamesStatusFormArgs = {
  initialValues?: InitialValues;
  game: GameInfoQuery["game"];
  gameStatusId?: number;
};
export const useGamesStatusForm = ({
  initialValues,
  gameStatusId,
  game,
}: UseGamesStatusFormArgs) => {
  const methods = useForm<GamesStatusAddFormFields>({
    resolver: zodResolver(GamesStatusAddFormSchema),
    defaultValues: getInitialValues(initialValues),
  });
  const { control, handleSubmit, reset, watch } = methods;

  const [upsertGameStatus] = useUpsertGameStatus();

  const toastController = useToastController();
  const displaySuccessToast = () => {
    toastController.show("Zapisano status gry", {
      description: "",
      variant: "success",
    });
  };

  const platformsWithAchievementsAvaliable = game.platforms.flatMap(
    (platform) => {
      const platformName = platform.name.toLowerCase();
      if (
        platformName.includes("playstation") ||
        platformName.includes("xbox") ||
        platformName.includes("pc") ||
        platformName.includes("linux") ||
        platformName.includes("mac")
      ) {
        return platform.id;
      }
      return [];
    },
  );

  const isPlatformWithAchievements =
    platformsWithAchievementsAvaliable.includes(Number(watch("platform")));
  const onSubmit = handleSubmit(async (data) => {
    const gameData = {
      achievementsCompleted: isPlatformWithAchievements
        ? data.platinium
        : false,
      completedIn: {
        hours: data.hours,
        minutes: data.minutes,
        seconds: data.seconds,
      },
      gameStatus: data.status,
      gameId: game.id,
      score: data.score,
      platformId: Number(data.platform),
      isEditing: Boolean(initialValues),
      gamesStatusId: gameStatusId,
      review: data.review,
    };

    const { errors } = await upsertGameStatus({
      variables: {
        input: gameData,
      },
    });

    if (!errors || errors.length === 0) {
      reset(DEFAULT_VALUES);
      displaySuccessToast();
      router.push("/games/games");
    }
  });

  return {
    isPlatformWithAchievements,
    control,
    DEFAULT_VALUES,
    onSubmit,
    methods,
  };
};
