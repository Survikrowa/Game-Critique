import { Controller, type Control } from "react-hook-form";
import { TextInput, View } from "react-native";

import { CreateChallengeFormFields } from "../create_challenge_form_schema";
import type { SearchForChallengeQuery } from "../use_search/search_challenge.generated";
import {
  MIN_SEARCH_LENGTH,
  useSearchForChallenge,
} from "../use_search/use_search";

import { haptic } from "@/modules/haptics/haptic";
import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type SearchGame = SearchForChallengeQuery["search"]["games"][number];

const NO_GAMES: SearchGame[] = [];

type GameSearchFieldProps = {
  control: Control<CreateChallengeFormFields>;
  search: string;
  onSearchChange: (value: string) => void;
};

export const GameSearchField = ({
  control,
  search,
  onSearchChange,
}: GameSearchFieldProps) => {
  const searchResult = useSearchForChallenge(search);

  const hasValidSearch = search.trim().length >= MIN_SEARCH_LENGTH;
  const games =
    hasValidSearch && searchResult.data?.search
      ? searchResult.data.search.games
      : NO_GAMES;

  const showNoResults =
    games.length === 0 && hasValidSearch && !searchResult.loading;

  return (
    <View style={{ gap: 4 }}>
      <Text size="small" weight="normal" color="secondary">
        Gra (HLTB)
      </Text>
      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Szukaj gry…"
        autoCapitalize="none"
        className="rounded-xl bg-background-50 px-4 py-3"
      />
      <Controller
        control={control}
        name="gameId"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View style={{ gap: 4 }}>
            {games.map((game) => {
              const isSelected = value === game.id;
              return (
                <Pressable
                  key={String(game.id)}
                  className={`min-h-[44px] items-center rounded-xl px-4 ${
                    isSelected ? "bg-primary-500" : "bg-background-50"
                  }`}
                  onPress={() => {
                    haptic.light();
                    onChange(game.id);
                  }}
                >
                  <Text
                    size="medium"
                    weight="semiBold"
                    color={isSelected ? "white" : "primary"}
                  >
                    {isSelected ? "✓ " : ""}
                    {game.name}
                  </Text>
                </Pressable>
              );
            })}
            {showNoResults && (
              <Text size="small" weight="normal" color="secondary">
                Brak wyników
              </Text>
            )}
            {error && (
              <Text size="small" weight="normal" color="warning">
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};
