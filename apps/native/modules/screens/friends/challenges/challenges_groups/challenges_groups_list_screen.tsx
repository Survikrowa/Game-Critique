import { router } from "expo-router";
import { Plus, Trophy } from "lucide-react-native";
import { useState } from "react";

import { useDisclosure } from "@/ui/hooks/use_disclosure";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  TextInput,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

import { ChallengeGroupCard } from "./challenge_group_card/challenge_group_card";
import { useChallengeGroups } from "./use_challenge_groups/use_challenge_groups";
import { useCreateChallengeGroupMutation } from "./use_create_group/create_group.mutation.generated";

import { haptic } from "@/modules/haptics/haptic";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable as AppPressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

const LOADING_SKELETON_COUNT = 3;

const LoadingState = () => (
  <VStack className="gap-3 px-4 pt-4">
    {Array.from({ length: LOADING_SKELETON_COUNT }).map((_, i) => (
      <Skeleton key={i} style={{ height: 56 }} />
    ))}
  </VStack>
);

export const ChallengesGroupsListScreen = () => {
  const query = useChallengeGroups();
  const [createGroup] = useCreateChallengeGroupMutation();
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  const [name, setName] = useState("");

  if (query.loading || !query.data) {
    return <LoadingState />;
  }

  const groups = query.data.challengeGroups;

  const handleCreate = async () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }
    haptic.medium();
    await createGroup({
      variables: { name: trimmedName },
      refetchQueries: ["ChallengeGroups"],
    });
    setName("");
    onClose();
  };

  return (
    <View className="flex-1">
      <FlatList
        data={groups}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ChallengeGroupCard
            group={item}
            onPress={() => router.push(`/friends/challenges/${item.id}`)}
          />
        )}
        refreshControl={
          <RefreshControl
            onRefresh={() => query.refetch()}
            refreshing={query.loading}
          />
        }
        ListEmptyComponent={
          <EmptyState
            title="Brak wyzwań"
            description="Utwórz grupę ze znajomymi i rzuć wyzwanie"
            icon={<Trophy size={32} color="#3B82F6" />}
          />
        }
        className="flex-1"
      />

      <View className="px-4 pb-6">
        <AppPressable
          className="min-h-[44px] flex-row items-center justify-center rounded-xl bg-primary-500"
          onPress={onOpen}
        >
          <Plus size={18} color="#FFFFFF" />
          <Text size="medium" color="white" weight="semiBold">
            Nowa grupa
          </Text>
        </AppPressable>
      </View>

      {isOpen && (
        <Modal transparent animationType="slide" onRequestClose={onClose}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            className="flex-1 justify-center px-6"
          >
            <Pressable className="absolute inset-0" onPress={onClose} />
            <View className="rounded-2xl bg-background-0 p-6 shadow-lg">
              <Text size="large" color="primary" weight="bold">
                Nowa grupa
              </Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nazwa grupy"
                className="mt-4 rounded-xl bg-background-50 px-4 py-3"
              />
              <HStack className="mt-6 justify-end gap-3">
                <AppPressable
                  className="min-h-[44px] justify-center px-2"
                  onPress={onClose}
                >
                  <Text size="medium" weight="semiBold" color="primary">
                    Anuluj
                  </Text>
                </AppPressable>
                <AppPressable
                  className="min-h-[44px] justify-center rounded-xl bg-primary-500 px-4"
                  onPress={handleCreate}
                >
                  <Text size="medium" color="white" weight="semiBold">
                    Utwórz
                  </Text>
                </AppPressable>
              </HStack>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
};
