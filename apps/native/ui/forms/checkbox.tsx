import { Check } from "@tamagui/lucide-icons";
import { Checkbox as TamaguiCheckbox, Label } from "tamagui";
import { Text } from "ui/typography/text";

import { HStack } from "@/ui/layout/hstack/hstack";

type CheckboxProps<T> = {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
  label: string;
  value: T;
  errorMessage?: string;
};

export const Checkbox = <T,>({
  onChange,
  isChecked,
  errorMessage,
  label,
}: CheckboxProps<T>) => {
  return (
    <HStack style={{ alignItems: "center", gap: 8 }}>
      <Label>
        <Text size="medium" weight="semiBold" color="primary">
          {label}
        </Text>
      </Label>
      <TamaguiCheckbox onCheckedChange={onChange} checked={isChecked} size="$4">
        <TamaguiCheckbox.Indicator>
          <Check />
        </TamaguiCheckbox.Indicator>
      </TamaguiCheckbox>
      {errorMessage && (
        <Text size="small" weight="bold" color="warning">
          {errorMessage}
        </Text>
      )}
    </HStack>
  );
};
