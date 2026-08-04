import { AlertCircle } from "lucide-react-native";
import { View } from "react-native";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Coś poszło nie tak",
  description = "Spróbuj ponownie za chwilę.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <VStack className="flex-1 items-center justify-center gap-4 p-8">
      <View className="bg-error-500/10 rounded-full p-6">
        <AlertCircle size={32} color="#ef4444" />
      </View>
      <VStack className="items-center gap-1">
        <Text size="large" weight="bold" color="red">
          {title}
        </Text>
        <Text size="medium" weight="normal" color="secondary">
          {description}
        </Text>
      </VStack>
      {onRetry && (
        <Button action="secondary" onPress={onRetry}>
          <ButtonText>Spróbuj ponownie</ButtonText>
        </Button>
      )}
    </VStack>
  );
};
