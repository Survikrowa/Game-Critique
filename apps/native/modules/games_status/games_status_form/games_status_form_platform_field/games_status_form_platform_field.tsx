import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller } from "react-hook-form";
import { Select } from "ui/forms/select";
import { Text } from "ui/typography/text";

import { GameInfoQuery } from "../../../screens/game/use_get_game_info/game_info.generated";
import { GamesStatusAddFormFields } from "../games_status_form_schema";
import { InitialValues } from "../use_games_status_form";

import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusFormPlatformFieldProps = {
  control: Control<GamesStatusAddFormFields>;
  game: GameInfoQuery["game"];
  initialValues?: InitialValues;
};

export const GamesStatusFormPlatformField = ({
  control,
  game,
  initialValues,
}: GamesStatusFormPlatformFieldProps) => {
  return (
    <VStack className="gap-1">
      <Text size="large" weight="bold" color="primary">
        Platforma*
      </Text>
      <Controller
        render={({ fieldState: { error }, field: { onChange, value } }) => (
          <>
            <Select
              defaultValue={initialValues?.platform || ""}
              placeholder="Wybierz platforme..."
              onChange={onChange}
              value={value}
              label="Platforma"
              items={game.platforms.map((platform) => ({
                name: platform.name,
                value: String(platform.id),
              }))}
            />
            <ErrorMessage
              name="platform"
              message={error?.message}
              render={(data) => (
                <Text size="small" weight="normal" color="warning">
                  {data.message}
                </Text>
              )}
            />
          </>
        )}
        name="platform"
        control={control}
      />
    </VStack>
  );
};
