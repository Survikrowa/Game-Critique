import { Check, Users, X } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Modal, Pressable, View } from "react-native";

import { useInviteMemberMutation } from "../invite_member/invite_member.generated";

import { haptic } from "@/modules/haptics/haptic";
import { useFriendsList } from "@/modules/screens/friends/friends_list/use_friends_list/use_friends_list";
import { UserAvatar } from "@/modules/user/user_avatar/user_avatar";
import { EmptyState } from "@/ui/feedback/empty_state/empty_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { Pressable as AppPressable } from "@/ui/forms/pressable/pressable";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

type InviteMembersModalProps = {
  groupId: number;
  visible: boolean;
  onClose: () => void;
};

type Selected = Record<string, boolean>;

export const InviteMembersModal = ({
  groupId,
  visible,
  onClose,
}: InviteMembersModalProps) => {
  const { data, loading } = useFriendsList();
  const [selected, setSelected] = useState<Selected>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inviteMember] = useInviteMemberMutation();

  useEffect(() => {
    if (visible) {
      setSelected({});
      setError(null);
    }
  }, [visible]);

  const friends = data?.friendsList.friends ?? [];
  const toggle = (id: string) =>
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  const submit = async () => {
    haptic.medium();
    const ids = Object.keys(selected).filter((id) => selected[id]);
    if (ids.length === 0) {
      return;
    }
    setSubmitting(true);
    const results = await Promise.all(
      ids.map((id) => inviteMember({ variables: { groupId, oauthId: id } })),
    );
    setSubmitting(false);
    if (results.some((result) => result.errors && result.errors.length > 0)) {
      setError("Nie udało się wysłać zaproszeń");
      haptic.error();
      return;
    }
    setError(null);
    onClose();
  };
  const hasSelection = Object.values(selected).some(Boolean);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable className="bg-black/50 flex-1 justify-end" onPress={onClose}>
        <View className="max-h-[70%] rounded-t-3xl bg-background-0 p-4">
          <HStack className="items-center justify-between py-2">
            <Text size="large" color="primary" weight="bold">
              Zaproś znajomych
            </Text>
            <AppPressable className="p-3" onPress={onClose}>
              <X size={20} color="#64748B" />
            </AppPressable>
          </HStack>
          {loading ? (
            <VStack className="gap-3 py-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} style={{ height: 44 }} />
              ))}
            </VStack>
          ) : (
            <FlatList
              data={friends}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <EmptyState
                  title="Brak znajomych"
                  description="Dodaj znajomych aby móc ich zapraszać do grup"
                  icon={<Users size={32} color="#3B82F6" />}
                />
              }
              renderItem={({ item }) => (
                <AppPressable
                  className="min-h-[44px] flex-row items-center justify-between px-2"
                  onPress={() => toggle(item.id)}
                >
                  <HStack className="items-center gap-2">
                    <UserAvatar avatarUrl={item.avatarUrl || ""} size="$6" />
                    <Text size="medium" color="primary" weight="normal">
                      {item.name}
                    </Text>
                  </HStack>
                  {selected[item.id] ? (
                    <Check size={20} color="#3B82F6" />
                  ) : (
                    <View className="h-5 w-5 rounded border border-outline-200" />
                  )}
                </AppPressable>
              )}
            />
          )}
          {error && (
            <Text size="small" color="red" weight="normal">
              {error}
            </Text>
          )}
          <AppPressable
            className="mt-4 min-h-[44px] items-center justify-center rounded-xl bg-primary-500"
            disabled={!hasSelection || submitting}
            onPress={submit}
          >
            <Text size="medium" color="white" weight="semiBold">
              {submitting ? "Wysyłanie..." : "Zaproś"}
            </Text>
          </AppPressable>
        </View>
      </Pressable>
    </Modal>
  );
};
