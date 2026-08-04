import { Link } from "expo-router";
import {
  Award,
  BarChart,
  Bell,
  Import,
  SlidersHorizontal,
} from "lucide-react-native";
import { FlatList, Pressable } from "react-native";
import { Text } from "ui/typography/text";

const FEATURE_LIST = [
  {
    title: "Statystyki",
    description: "Wyświetl swoje statystyki.",
    route: "/user/stats" as const,
    Icon: BarChart,
  },
  {
    title: "Gaming Wrapped",
    description: "Podsumowanie Twojego roku.",
    route: "/user/wrapped" as const,
    Icon: Award,
  },
  {
    title: "HLTB Migracja",
    description: "Przenieś swoje dane z HLTB.",
    Icon: Import,
    route: "/user/hltb" as const,
  },
  {
    title: "Obserwowane premiery",
    description: "Zarządzaj powiadomieniami o premierach.",
    route: "/user/reminders" as const,
    Icon: Bell,
  },
  {
    title: "Preferencje",
    description: "Powiadomienia i platformy.",
    route: "/user/preferences" as const,
    Icon: SlidersHorizontal,
  },
];

export const ProfileFeatures = () => {
  return (
    <FlatList
      data={FEATURE_LIST}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
      }}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      renderItem={({ item }) => {
        return (
          <Link href={item.route} asChild>
            <Pressable className="max-w-[180px] flex-1 items-center justify-center rounded bg-background-50 p-3">
              <item.Icon size={20} color="#3B82F6" />
              <Text size="medium" weight="normal" color="primary">
                {item.title}
              </Text>
              <Text size="small" weight="normal" color="secondary">
                {item.description}
              </Text>
            </Pressable>
          </Link>
        );
      }}
    />
  );
};
