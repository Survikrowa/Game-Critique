import { Control, Controller } from "react-hook-form";
import { Text } from "ui/typography/text";

import { GamesStatusAddFormFields } from "../games_status_form_schema";

import { WheelPicker } from "@/ui/forms/wheel_picker/wheel_picker";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

const HOURS = Array.from({ length: 501 }, (_, i) => i);
const MINUTES_AND_SECONDS = Array.from({ length: 60 }, (_, i) => i);
const padTwoDigits = (value: number) => String(value).padStart(2, "0");

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
      <HStack className="items-center justify-evenly">
        <VStack className="flex-1 items-center gap-1">
          <Controller
            render={({ field: { onChange, value } }) => (
              <WheelPicker
                data={HOURS}
                value={Number(value) || 0}
                onChange={(next) => onChange(String(next))}
              />
            )}
            control={control}
            name="hours"
          />
          <Text size="small" weight="normal" color="secondary">
            godz.
          </Text>
        </VStack>
        <VStack className="flex-1 items-center gap-1">
          <Controller
            render={({ field: { onChange, value } }) => (
              <WheelPicker
                data={MINUTES_AND_SECONDS}
                value={Number(value) || 0}
                onChange={(next) => onChange(String(next))}
                formatLabel={padTwoDigits}
              />
            )}
            control={control}
            name="minutes"
          />
          <Text size="small" weight="normal" color="secondary">
            min.
          </Text>
        </VStack>
        <VStack className="flex-1 items-center gap-1">
          <Text size="small" weight="normal" color="secondary">
            sek.
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
