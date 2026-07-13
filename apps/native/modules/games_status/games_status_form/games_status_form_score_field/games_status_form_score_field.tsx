import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller } from "react-hook-form";
import { Select } from "ui/forms/select";
import { TextArea } from "ui/forms/text_area";
import { Text } from "ui/typography/text";

import { GAMES_SCORES } from "../games_scores";
import { GamesStatusFormFullModeSection } from "../games_status_form_full_mode_section/games_status_form_full_mode_section";
import { GamesStatusAddFormFields } from "../games_status_form_schema";
import { DEFAULT_VALUES } from "../use_games_status_form";

import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusFormScoreFieldProps = {
  control: Control<GamesStatusAddFormFields>;
  isQuickMode: boolean;
};

export const GamesStatusFormScoreField = ({
  control,
  isQuickMode,
}: GamesStatusFormScoreFieldProps) => {
  return (
    <VStack className="gap-1">
      <Text size="large" weight="bold" color="primary">
        Ocena
      </Text>
      <Controller
        render={({ fieldState: { error }, field: { onChange, value } }) => (
          <>
            <Select
              placeholder="Wybierz ocene..."
              onChange={onChange}
              value={value || ""}
              label="Ocena"
              items={GAMES_SCORES.map((score) => ({
                name: score.name,
                value: score.value,
              }))}
            />
            <ErrorMessage
              name="score"
              message={error?.message}
              render={(data) => (
                <Text size="small" weight="normal" color="warning">
                  {data.message}
                </Text>
              )}
            />
          </>
        )}
        control={control}
        name="score"
      />
      <GamesStatusFormFullModeSection
        isQuickMode={isQuickMode}
        withSeparator={false}
      >
        <Controller
          render={({ fieldState: { error }, field: { onChange, value } }) => (
            <TextArea
              onChange={onChange}
              value={value || DEFAULT_VALUES.review}
              label="Opcjonalne miejsce na recenzje"
              errorMessage={error?.message}
            />
          )}
          control={control}
          name="review"
        />
      </GamesStatusFormFullModeSection>
    </VStack>
  );
};
