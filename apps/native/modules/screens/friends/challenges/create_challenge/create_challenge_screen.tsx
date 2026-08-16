import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { ScrollView } from "react-native";

import { CreateChallengeSkeleton } from "./create_challenge_skeleton/create_challenge_skeleton";
import { GameSearchField } from "./game_search_field/game_search_field";
import { RecipientField } from "./recipient_field/recipient_field";
import { TypeToggleField } from "./type_toggle_field/type_toggle_field";
import { useCreateChallengeForm } from "./use_create_challenge_form/use_create_challenge_form";

import { Pressable } from "@/ui/forms/pressable/pressable";
import { Text } from "@/ui/typography/text";

type CreateChallengeScreenProps = {
  groupId: number;
};

export const CreateChallengeScreen = ({
  groupId,
}: CreateChallengeScreenProps) => {
  const { methods, control, onSubmit, members, groupsQuery } =
    useCreateChallengeForm({ groupId });
  const [search, setSearch] = useState("");

  if (groupsQuery.loading || !groupsQuery.data) {
    return <CreateChallengeSkeleton />;
  }

  const recipientId = methods.watch("recipientId");
  const gameId = methods.watch("gameId");
  const canSubmit = recipientId.length > 0 && gameId !== null;

  return (
    <FormProvider {...methods}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          gap: 16,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 32,
        }}
      >
        <Text size="extraLarge" color="primary" weight="bold">
          Nowe wyzwanie
        </Text>

        <RecipientField control={control} members={members} />

        <TypeToggleField control={control} />

        <GameSearchField
          control={control}
          search={search}
          onSearchChange={setSearch}
        />

        <Pressable
          className="min-h-[44px] items-center justify-center rounded-xl bg-primary-500"
          disabled={!canSubmit}
          onPress={onSubmit}
        >
          <Text size="medium" color="white" weight="semiBold">
            Zaproś do wyzwania
          </Text>
        </Pressable>
      </ScrollView>
    </FormProvider>
  );
};
