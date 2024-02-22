import { Label, YStack, TextArea as TamaguiTexarea } from "tamagui";

import { Text } from "../typography/text";

type TextAreaProps = {
  onChange: (text: string) => void;
  value: string;
  label: string;
  errorMessage?: string;
};

export const TextArea = ({
  onChange,
  label,
  errorMessage,
  value,
}: TextAreaProps) => {
  return (
    <YStack width="100%" justifyContent="center" alignItems="center">
      <Label color="white">{label}</Label>
      <TamaguiTexarea
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
