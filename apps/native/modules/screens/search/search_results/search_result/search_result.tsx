import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { Image, Pressable, View } from "react-native";
import { Text } from "ui/typography/text";

import { SearchGamesQuery } from "../../search_input/use_search/search_query.generated";

import { haptic } from "@/modules/haptics/haptic";

export type SearchGameResult = SearchGamesQuery["search"]["games"][number];

type SearchResultProps = {
  result: SearchGameResult;
  redirectTo: string;
  onBeforeNavigate?: (result: SearchGameResult) => void;
};

export const SearchResult = ({
  result,
  redirectTo,
  onBeforeNavigate,
}: SearchResultProps) => {
  return (
    <Pressable
      android_ripple={{ color: "rgba(255,255,255,0.06)" }}
      onPress={() => {
        haptic.light();
        onBeforeNavigate?.(result);
        // @ts-ignore — pre-existing route type issue
        router.push(`${redirectTo}/${result.id}`);
      }}
      style={({ pressed }) => ({ opacity: pressed ? 0.75 : 1 })}
    >
      <View className="flex-row items-center gap-3 px-4 py-3 bg-background-50 rounded-2xl">
        <Image
          source={{ uri: result.cover.small_url }}
          style={{ width: 52, height: 68, borderRadius: 8 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text size="medium" weight="semiBold" color="primary">
            {result.name}
          </Text>
        </View>
        <ChevronRight size={18} color="#64748B" />
      </View>
    </Pressable>
  );
};
