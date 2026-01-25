import { Text } from "ui/typography/text";

import { pluralizePolish } from "@/modules/strings/pluralize";
import { HStack } from "@/ui/layout/hstack/hstack";

type UserGameStatusCompletedInSectionProps = {
  hours: number | null | undefined;
  minutes: number | null | undefined;
  seconds: number | null | undefined;
};

export const UserGameStatusCompletedInSection = ({
  hours,
  minutes,
  seconds,
}: UserGameStatusCompletedInSectionProps) => {
  return (
    <HStack className="items-start gap-2 flex-wrap">
      <Text size="large" weight="bold" color="primary">
        Ukończono w:
      </Text>
      <Text size="large" weight="normal" color="primary">
        {hours} {pluralizePolish(hours || 0, "godzina", "godziny", "godzin")},{" "}
        {minutes} {pluralizePolish(minutes || 0, "minuta", "minuty", "minut")} i{" "}
        {seconds}{" "}
        {pluralizePolish(seconds || 0, "sekunda", "sekundy", "sekund")}
      </Text>
    </HStack>
  );
};
