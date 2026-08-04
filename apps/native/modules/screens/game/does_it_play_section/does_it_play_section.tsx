import { View } from "react-native";

import { useFetchDoesItPlayDataMutation } from "./fetch_does_it_play_data.generated";

import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Card } from "@/ui/panels/card/card";
import { Text } from "@/ui/typography/text";

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
          <Text size="medium" weight="normal" color="secondary">
            Brak danych o kompatybilności
          </Text>
          <Pressable
            onPress={handleFetch}
            className="min-h-[44px] items-center justify-center rounded-full bg-primary-500 px-4"
          >
            <Text size="medium" weight="bold" color="white">
              Sprawdź kompatybilność
            </Text>
          </Pressable>
        </VStack>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <VStack className="gap-3">
        <Text size="large" weight="bold" color="primary">
          Kompatybilność (DoesItPlay)
        </Text>
        {entries.map((entry, index) => (
          <VStack key={index} className="gap-1">
            <View className="my-1 h-px bg-background-100" />
            <Text size="small" weight="bold" color="primary">
              {entry.platform || "Nieznana platforma"}
            </Text>
            <HStack className="gap-4">
              <HStack className="items-center gap-1">
                <Text size="small" weight="normal" color="secondary">
                  Na płycie:
                </Text>
                <Text size="small" weight="normal" color="primary">
                  {entry.hasPhysicalRelease ? "Tak" : "Nie"}
                </Text>
              </HStack>
              <HStack className="items-center gap-1">
                <Text size="small" weight="normal" color="secondary">
                  Wymaga downloadu:
                </Text>
                <Text size="small" weight="normal" color="primary">
                  {entry.hasGameOnDisc ? "Nie" : "Tak"}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        ))}
      </VStack>
    </Card>
  );
};
