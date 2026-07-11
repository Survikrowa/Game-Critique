import { useRef } from "react";
import { FlatList, Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Gamepad2, Search, SearchX, X } from "lucide-react-native";
import { Text } from "ui/typography/text";

import { SearchResult } from "./search_results/search_result/search_result";
import { useSearchScreen } from "./use_search_screen";

import { Skeleton } from "@/ui/feedback/skeleton/skeleton";

type SearchScreenProps = {
  redirectTo: string;
};

const SearchSkeleton = () => (
  <View style={{ gap: 8, paddingHorizontal: 16 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <View
        key={i}
        className="flex-row items-center gap-3 px-4 py-3 bg-background-50 rounded-2xl"
      >
        <Skeleton className="w-[52px] h-[68px] rounded-lg" />
        <View style={{ flex: 1, gap: 8 }}>
          <Skeleton className="h-4 rounded-md w-3/4" />
          <Skeleton className="h-3 rounded-md w-1/2" />
        </View>
      </View>
    ))}
  </View>
);

export const SearchScreen = ({ redirectTo }: SearchScreenProps) => {
  const {
    handleSearchInputChange,
    handleClearInput,
    input,
    debouncedInput,
    loading,
    data,
    hasInput,
  } = useSearchScreen();

  const insets = useSafeAreaInsets();
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);

  const games = data?.search.games ?? [];
  const showSkeleton = loading;
  const showNoResults =
    !loading && hasInput && debouncedInput.length > 0 && games.length === 0;
  const showEmpty = !hasInput;
  const showResults = !loading && games.length > 0;

  return (
    <View className="flex-1 bg-background-0">
      <View style={{ paddingTop: insets.top }} className="bg-background-0" />

      <View className="flex-row items-center gap-2 px-3 py-3 bg-background-0 border-b border-outline-50">
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          className="w-[44px] h-[44px] items-center justify-center rounded-full"
        >
          <ArrowLeft size={22} color="#94A3B8" />
        </Pressable>

        <View className="flex-1 flex-row items-center gap-2 bg-background-100 rounded-2xl px-3 h-[44px]">
          <Search size={16} color="#64748B" />
          <TextInput
            ref={inputRef}
            autoFocus
            placeholder="Szukaj gier..."
            placeholderTextColor="#475569"
            value={input}
            onChangeText={handleSearchInputChange}
            returnKeyType="search"
            className="flex-1 text-typography-100 text-base"
            style={{ paddingVertical: 0 }}
          />
          {hasInput && (
            <Pressable
              onPress={handleClearInput}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={16} color="#64748B" />
            </Pressable>
          )}
        </View>
      </View>

      {showEmpty && (
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <View className="w-20 h-20 rounded-full bg-background-100 items-center justify-center">
            <Gamepad2 size={36} color="#475569" />
          </View>
          <View className="items-center gap-1">
            <Text size="large" weight="bold" color="primary">
              Szukaj gier
            </Text>
            <Text size="small" weight="normal" color="secondary">
              Wpisz tytuł gry, którą chcesz znaleźć
            </Text>
          </View>
        </View>
      )}

      {showSkeleton && <SearchSkeleton />}

      {showNoResults && (
        <View className="flex-1 items-center justify-center gap-4 px-8">
          <View className="w-20 h-20 rounded-full bg-background-100 items-center justify-center">
            <SearchX size={36} color="#475569" />
          </View>
          <View className="items-center gap-1">
            <Text size="large" weight="bold" color="primary">
              Brak wyników
            </Text>
            <Text size="small" weight="normal" color="secondary">
              Nie znaleziono gier dla „{debouncedInput}"
            </Text>
          </View>
        </View>
      )}

      {showResults && (
        <FlatList
          data={games}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16, gap: 8 }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <SearchResult result={item} redirectTo={redirectTo} />
          )}
        />
      )}
    </View>
  );
};
