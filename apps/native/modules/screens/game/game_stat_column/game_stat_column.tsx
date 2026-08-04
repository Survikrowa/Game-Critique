import { ReactNode } from "react";
import { View } from "react-native";
import { Text } from "ui/typography/text";

type StatColumnProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

export const StatColumn = ({ icon, label, value }: StatColumnProps) => (
  <View
    className="flex-1 items-center bg-background-50 rounded-2xl py-4 px-2"
    style={{ gap: 6 }}
  >
    {icon}
    <Text size="extraSmall" weight="normal" color="secondary">
      {label}
    </Text>
    <Text size="medium" weight="bold" color="primary">
      {value}
    </Text>
  </View>
);
