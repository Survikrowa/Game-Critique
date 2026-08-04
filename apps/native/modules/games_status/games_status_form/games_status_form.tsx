import { FormProvider } from "react-hook-form";
import { View } from "react-native";

import { GamesStatusFormAchievementsField } from "./games_status_form_achievements_field/games_status_form_achievements_field";
import { GamesStatusFormFullModeSection } from "./games_status_form_full_mode_section/games_status_form_full_mode_section";
import { GamesStatusFormModeToggle } from "./games_status_form_mode_toggle/games_status_form_mode_toggle";
import { GamesStatusFormPlatformField } from "./games_status_form_platform_field/games_status_form_platform_field";
import { GamesStatusFormPlayTimeField } from "./games_status_form_play_time_field/games_status_form_play_time_field";
import { GamesStatusFormScoreField } from "./games_status_form_score_field/games_status_form_score_field";
import { GamesStatusFormStatusField } from "./games_status_form_status_field/games_status_form_status_field";
import { InitialValues, useGamesStatusForm } from "./use_games_status_form";
import { GameInfoQuery } from "../../screens/game/use_get_game_info/game_info.generated";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { Separator } from "@/ui/layout/separator/separator";
import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusFormProps = {
  initialValues?: InitialValues;
  gameStatusId?: number;
  game: GameInfoQuery["game"];
};

export const GamesStatusForm = ({
  initialValues,
  game,
  gameStatusId,
}: GamesStatusFormProps) => {
  const {
    onSubmit,
    control,
    isPlatformWithAchievements,
    methods,
    isQuickMode,
    setIsQuickMode,
  } = useGamesStatusForm({
    initialValues,
    game,
    gameStatusId,
  });

  return (
    <FormProvider {...methods}>
      <View>
        <VStack className="gap-4">
          <GamesStatusFormModeToggle
            isQuickMode={isQuickMode}
            onChange={setIsQuickMode}
          />

          <GamesStatusFormStatusField control={control} />

          <Separator />

          <GamesStatusFormFullModeSection isQuickMode={isQuickMode}>
            <GamesStatusFormPlayTimeField control={control} />
          </GamesStatusFormFullModeSection>

          <GamesStatusFormPlatformField
            control={control}
            game={game}
            initialValues={initialValues}
          />

          <Separator />

          <GamesStatusFormFullModeSection isQuickMode={isQuickMode}>
            <GamesStatusFormAchievementsField
              isPlatformWithAchievements={isPlatformWithAchievements}
            />
          </GamesStatusFormFullModeSection>

          <GamesStatusFormScoreField
            control={control}
            isQuickMode={isQuickMode}
          />

          <Button action="primary" className="mt-4" onPress={onSubmit}>
            <ButtonText>
              {methods.formState.isSubmitting
                ? "Trwa zapisywanie..."
                : "Zapisz"}
            </ButtonText>
          </Button>
        </VStack>
      </View>
    </FormProvider>
  );
};
