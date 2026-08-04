import { ReactNode } from "react";
import { View } from "react-native";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({
  title,
  description,
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <VStack className="flex-1 items-center justify-center gap-4 p-8">
      {icon && (
        <View className="bg-background-100 rounded-full p-6">{icon}</View>
      )}
      <VStack className="items-center gap-1">
        <Text size="large" weight="bold" color="primary">
          {title}
        </Text>
        {description && (
          <Text size="medium" weight="normal" color="secondary">
            {description}
          </Text>
        )}
      </VStack>
      {actionLabel && onAction && (
        <Button action="primary" onPress={onAction}>
          <ButtonText>{actionLabel}</ButtonText>
        </Button>
      )}
    </VStack>
  );
};
