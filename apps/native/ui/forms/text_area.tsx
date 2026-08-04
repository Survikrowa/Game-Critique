import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { Text, TextInput, View } from "react-native";

import { Text as AppText } from "../typography/text";

type TextAreaProps = {
  onChange: (text: string) => void;
  value: string;
  label: string;
  errorMessage?: string;
};

const textAreaStyle = tva({
  base: "w-full min-h-[80px] p-3 rounded-xl bg-background-50 border-2 text-typography-100 text-base",
  variants: {
    error: {
      true: "border-error-400",
      false: "border-outline-200",
    },
  },
});

export const TextArea = ({
  onChange,
  label,
  errorMessage,
  value,
}: TextAreaProps) => {
  return (
    <View className="w-full items-center">
      <Text className="text-typography-100 text-sm mb-1 self-start">
        {label}
      </Text>
      <TextInput
        onChangeText={onChange}
        value={value}
        multiline
        className={textAreaStyle({ error: Boolean(errorMessage) })}
        textAlignVertical="top"
      />
      {Boolean(errorMessage) && (
        <AppText size="small" weight="semiBold" color="warning">
          {errorMessage}
        </AppText>
      )}
    </View>
  );
};
