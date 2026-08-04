import { useState } from "react";
import { View } from "react-native";
import { useDebounce } from "use-debounce";

import { FriendsSearchResults } from "./friends_search_results/friends_search_results";
import { useGetUsersSearch } from "./use_get_users_search/use_get_users_search";
import { SearchInput } from "../../search/search_input/search_input";
import { ErrorState } from "@/ui/feedback/error_state/error_state";
import { Skeleton } from "@/ui/feedback/skeleton/skeleton";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";
import { Text } from "@/ui/typography/text";

const SearchSkeleton = () => (
  <VStack className="mt-4 gap-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <HStack key={i} className="items-center gap-3">
        <Skeleton variant="circular" style={{ width: 40, height: 40 }} />
        <Skeleton style={{ flex: 1, height: 14 }} />
      </HStack>
    ))}
  </VStack>
);

export const FriendsSearchScreen = () => {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounce(username, 1000);
  const { data, loading, error, refetch } = useGetUsersSearch(
    { input: debouncedUsername },
    { skip: !debouncedUsername },
  );

  const hasQuery = debouncedUsername.length > 0;

  return (
    <VStack className="gap-4 p-4">
      <SearchInput
        onChange={(value) => setUsername(value)}
        value={username}
        placeholder="Wyszukaj użytkowników..."
      />
      {!hasQuery && (
        <View className="py-8">
          <Text size="medium" color="secondary" className="text-center">
            Wpisz nazwę użytkownika, aby znaleźć znajomych
          </Text>
        </View>
      )}
      {hasQuery && loading && <SearchSkeleton />}
      {hasQuery && error && (
        <ErrorState
          title="Błąd wyszukiwania"
          description="Nie udało się wyszukać użytkowników"
          onRetry={() => refetch()}
        />
      )}
      {hasQuery && data?.usersSearch && (
        <FriendsSearchResults
          users={data.usersSearch.map((user) => ({
            oauthId: user.oauthId,
            name: user.profile?.name,
            avatarUrl: user.profile?.avatarUrl,
            isFriendRequestSent: user.isFriendRequestSent,
          }))}
        />
      )}
    </VStack>
  );
};
