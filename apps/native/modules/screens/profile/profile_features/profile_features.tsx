import { Link } from "expo-router";
import { BarChart, Import } from "lucide-react-native";
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
    title: "HLTB Migracja",
    description: "Przenieś swoje dane z HLTB.",
    Icon: Import,
    route: "/user/hltb" as const,
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
