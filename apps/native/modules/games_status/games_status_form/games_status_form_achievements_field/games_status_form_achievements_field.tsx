import { Controller } from "react-hook-form";
import { Checkbox } from "ui/forms/checkbox";
import { Text } from "ui/typography/text";

import { VStack } from "@/ui/layout/vstack/vstack";

type GamesStatusFormAchievementsFieldProps = {
  isPlatformWithAchievements: boolean;
};

export const GamesStatusFormAchievementsField = ({
  isPlatformWithAchievements,
}: GamesStatusFormAchievementsFieldProps) => {
  return (
    <VStack className="gap-2">
      <Text size="large" weight="bold" color="primary">
        Osiągnięcia
      </Text>
      {isPlatformWithAchievements ? (
        <Controller
          render={({ fieldState: { error }, field: { onChange, value } }) => (
            <Checkbox
              onChange={onChange}
              value={value}
              isChecked={value}
              label="Osiągnieto 100% gry"
              errorMessage={error?.message}
            />
          )}
          name="platinium"
        />
      ) : (
        <Text size="large" weight="bold" color="secondary">
          Ta gra lub platforma nie posiada osiągnięć
        </Text>
      )}
    </VStack>
  );
};
