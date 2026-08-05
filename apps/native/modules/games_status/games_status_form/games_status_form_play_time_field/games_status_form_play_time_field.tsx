import { Control, Controller } from "react-hook-form";

import { GamesStatusAddFormFields } from "../games_status_form_schema";

import { Input } from "@/ui/forms/input";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type GamesStatusFormPlayTimeFieldProps = {
  control: Control<GamesStatusAddFormFields>;
};

export const GamesStatusFormPlayTimeField = ({
  control,
}: GamesStatusFormPlayTimeFieldProps) => {
  return (
    <VStack className="gap-1">
      <Text size="large" weight="bold" color="primary">
        Czas gry
      </Text>
      <HStack className="gap-3">
        <VStack className="flex-1 gap-1">
          <Controller
            render={({ field: { onChange, value } }) => (
              <Input
                label="godz."
                value={value || ""}
                onChange={onChange}
                inputMode="numeric"
              />
            )}
            control={control}
            name="hours"
          />
        </VStack>
        <VStack className="flex-1 gap-1">
          <Controller
            render={({ field: { onChange, value } }) => (
              <Input
                label="min."
                value={value || ""}
                onChange={onChange}
                inputMode="numeric"
              />
            )}
            control={control}
            name="minutes"
          />
        </VStack>
      </HStack>
    </VStack>
  );
};
