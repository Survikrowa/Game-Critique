import { View } from "react-native";
import { useFetchDoesItPlayDataMutation } from "./fetch_does_it_play_data.generated";
import { Card } from "@/ui/panels/card/card";
import { VStack } from "@/ui/layout/vstack/vstack";
import { HStack } from "@/ui/layout/hstack/hstack";
import { Text } from "@/ui/typography/text";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";

type PhysicalMediaEntry = {
  platform?: string | null;
  hasPhysicalRelease: boolean;
  hasGameOnDisc: boolean;
};

type DoesItPlaySectionProps = {
  entries: PhysicalMediaEntry[] | null | undefined;
  hltbId: number | undefined;
  onDataFetched: () => void;
};

export const DoesItPlaySection = ({
  entries,
  hltbId,
  onDataFetched,
}: DoesItPlaySectionProps) => {
  const [fetchMutation, { loading }] = useFetchDoesItPlayDataMutation();

  const handleFetch = async () => {
    if (!hltbId) return;
    await fetchMutation({ variables: { hltbId } });
    onDataFetched();
  };

  if (loading) {
    return (
      <Card className="p-4">
        <VStack className="gap-3">
          <Skeleton style={{ width: 160, height: 20 }} />
          <Skeleton style={{ width: "100%", height: 60 }} />
        </VStack>
      </Card>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <Card className="p-4">
        <VStack className="items-center gap-3">
          <Text color="secondary">Brak danych o kompatybilności</Text>
          <Pressable
            onPress={handleFetch}
            className="min-h-[44px] px-4 rounded-full bg-primary-500 items-center justify-center"
          >
            <Text color="white">Sprawdź kompatybilność</Text>
          </Pressable>
        </VStack>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <VStack className="gap-3">
        <Text weight="bold" color="primary">
          Kompatybilność (DoesItPlay)
        </Text>
        {entries.map((entry, index) => (
          <VStack key={index} className="gap-1">
            <View className="h-px bg-background-100 my-1" />
            <Text weight="bold" size="sm">
              {entry.platform || "Nieznana platforma"}
            </Text>
            <HStack className="gap-4">
              <HStack className="items-center gap-1">
                <Text size="sm" color="secondary">
                  Na płycie:
                </Text>
                <Text size="sm">
                  {entry.hasPhysicalRelease ? "Tak" : "Nie"}
                </Text>
              </HStack>
              <HStack className="items-center gap-1">
                <Text size="sm" color="secondary">
                  Wymaga downloadu:
                </Text>
                <Text size="sm">{entry.hasGameOnDisc ? "Nie" : "Tak"}</Text>
              </HStack>
            </HStack>
          </VStack>
        ))}
      </VStack>
    </Card>
  );
};
