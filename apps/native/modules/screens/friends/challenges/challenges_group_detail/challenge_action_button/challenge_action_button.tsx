import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type ChallengeActionButtonProps = {
  label: string;
  onPress: () => void;
  variant: "primary" | "danger";
};

export const ChallengeActionButton = ({
  label,
  onPress,
  variant,
}: ChallengeActionButtonProps) => (
  <Pressable
    className={`min-h-[44px] justify-center rounded-lg px-4 ${
      variant === "primary" ? "bg-primary-500" : "bg-error-500"
    }`}
    onPress={onPress}
  >
    <Text size="medium" color="white" weight="semiBold">
      {label}
    </Text>
  </Pressable>
);
