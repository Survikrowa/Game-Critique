import { BarChart, Import } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { FlatList } from "react-native-gesture-handler";
import { YStack } from "tamagui";

import { Text } from "../../../../ui/typography/text";

const FEATURE_LIST = [
  {
    title: "Statystyki",
    description: "Wyświetl swoje statystyki.",
    route: "/user/stats",
    icon: BarChart,
  },
  {
    title: "HLTB Migracja",
    description: "Przenieś swoje dane z HLTB.",
    icon: Import,
    route: "/user/hltb",
  },
];

export const ProfileFeatures = () => {
  return (
    <FlatList
      data={FEATURE_LIST}
      numColumns={2}
      columnWrapperStyle={{
        display: "flex",
        justifyContent: "space-between",
      }}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      renderItem={({ item }) => {
        const Icon = item.icon;
        return (
          <Link href={item.route} asChild>
            <YStack
              backgroundColor="$color.container"
              borderRadius={4}
              alignItems="center"
              justifyContent="center"
              flex={1}
              padding={6}
              maxWidth={180}
            >
              <Icon color="white" />
              <Text size="medium" weight="normal" color="white">
                {item.title}
              </Text>
              <Text size="small" weight="normal" color="white">
                {item.description}
              </Text>
            </YStack>
          </Link>
        );
      }}
    />
  );
};
