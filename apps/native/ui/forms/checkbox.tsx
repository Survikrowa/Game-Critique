import { Check } from "@tamagui/lucide-icons";
import { Checkbox as TamaguiCheckbox, Label, XStack } from "tamagui";
import { Text } from "ui/typography/text";

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
    <XStack alignItems="center" gap={8}>
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
    </XStack>
  );
};
