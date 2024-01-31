import { Label, YStack, Input as TamaguiInput } from "tamagui";

import { Text } from "../typography/text";

type InputProps = {
  onChange: (text: string) => void;
  value: string;
  label: string;
  errorMessage?: string;
};

export const Input = ({ onChange, value, label, errorMessage }: InputProps) => {
  return (
    <YStack width="100%" justifyContent="center" alignItems="center" gap={4}>
      <Label color="black">{label}</Label>
      <TamaguiInput
        onChangeText={onChange}
        value={value}
        minHeight={32}
        width="100%"
        borderColor={errorMessage ? "$red8" : "black"}
      />
      {Boolean(errorMessage) && (
        <Text size="small" weight="semiBold" color="warning">
          {errorMessage}
        </Text>
      )}
    </YStack>
  );
};
