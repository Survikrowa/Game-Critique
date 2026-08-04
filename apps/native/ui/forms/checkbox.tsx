import { tva } from "@gluestack-ui/utils/nativewind-utils";
import { Check } from "lucide-react-native";
import { Pressable } from "react-native";

import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";

type CheckboxProps<T> = {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
  label: string;
  value: T;
  errorMessage?: string;
};

const checkboxBoxStyle = tva({
  base: "w-6 h-6 rounded border-2 items-center justify-center",
  variants: {
    checked: {
      true: "bg-primary-500 border-primary-500",
      false: "bg-transparent border-outline-300",
    },
  },
});

export const Checkbox = <T,>({
  onChange,
  isChecked,
  errorMessage,
  label,
}: CheckboxProps<T>) => {
  return (
    <HStack style={{ alignItems: "center", gap: 8 }}>
      <Text size="medium" weight="semiBold" color="primary">
        {label}
      </Text>
      <Pressable
        onPress={() => onChange(!isChecked)}
        className={checkboxBoxStyle({ checked: isChecked })}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isChecked }}
      >
        {isChecked ? <Check size={14} color="#fff" /> : null}
      </Pressable>
      {errorMessage ? (
        <Text size="small" weight="bold" color="warning">
          {errorMessage}
        </Text>
      ) : null}
    </HStack>
  );
};
