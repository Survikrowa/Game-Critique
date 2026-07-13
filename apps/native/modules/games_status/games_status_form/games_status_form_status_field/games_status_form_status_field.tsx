import { ErrorMessage } from "@hookform/error-message";
import { Control, Controller } from "react-hook-form";
import { Select } from "ui/forms/select";
import { Text } from "ui/typography/text";

import { GamesStatusAddFormFields } from "../games_status_form_schema";
import { GAMES_STATUSES } from "../games_statuses";

import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusFormStatusFieldProps = {
  control: Control<GamesStatusAddFormFields>;
};

export const GamesStatusFormStatusField = ({
  control,
}: GamesStatusFormStatusFieldProps) => {
  return (
    <VStack className="gap-1">
      <Text size="large" weight="bold" color="primary">
        Status*
      </Text>
      <Controller
        render={({ fieldState: { error }, field: { onChange, value } }) => (
          <>
            <Select
              placeholder="Wybierz status gry..."
              onChange={onChange}
              value={value}
              label="Status"
              items={GAMES_STATUSES}
            />
            <ErrorMessage
              name="status"
              message={error?.message}
              render={(data) => (
                <Text size="small" weight="normal" color="warning">
                  {data.message}
                </Text>
              )}
            />
          </>
        )}
        name="status"
        control={control}
      />
    </VStack>
  );
};
