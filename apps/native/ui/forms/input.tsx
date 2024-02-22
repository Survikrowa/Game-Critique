import { Label, YStack, Input as TamaguiInput } from "tamagui";

import { Text } from "../typography/text";

type InputProps = {
  onChange: (text: string) => void;
  value: string;
  label: string;
  errorMessage?: string;
  inputMode?: "text" | "numeric";
};

export const Input = ({
  onChange,
  value,
  label,
  errorMessage,
  inputMode = "text",
}: InputProps) => {
  return (
    <YStack width="100%" justifyContent="center" alignItems="center" gap={4}>
      <Label color="white">{label}</Label>
      <TamaguiInput
        onChangeText={onChange}
        value={value}
        minHeight={32}
        width="100%"
        borderColor={errorMessage ? "$red8" : "black"}
        inputMode={inputMode}
      />
      {Boolean(errorMessage) && (
        <Text size="small" weight="semiBold" color="warning">
          {errorMessage}
        </Text>
      )}
    </YStack>
  );
};
