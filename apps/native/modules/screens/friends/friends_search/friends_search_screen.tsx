import { useState } from "react";
import { Spinner, YStack } from "tamagui";
import { Text } from "ui/typography/text";
import { useDebounce } from "use-debounce";

import { FriendsSearchResults } from "./friends_search_results/friends_search_results";
import { useGetUsersSearch } from "./use_get_users_search/use_get_users_search";
import { SearchInput } from "../../search/search_input/search_input";

export const FriendsSearchScreen = () => {
  const [username, setUsername] = useState("");
  const [debouncedUsername] = useDebounce(username, 1000);
  const { data, loading } = useGetUsersSearch({ input: debouncedUsername });
  return (
    <YStack padding={16} gap={6}>
      <Text size="large" weight="normal" color="secondary">
        Wyszukiwarka
      </Text>
      <SearchInput onChange={(value) => setUsername(value)} value={username} />
      <Text size="small" weight="normal" color="secondary">
        Używając powyższego inputa możesz wyszukać użytkownków i dodać ich do
        znajomych.
      </Text>
      <YStack marginTop={8}>
        {loading && <Spinner size="large" />}
        {data && data.usersSearch && (
          <FriendsSearchResults
            users={data.usersSearch.map((user) => ({
              oauthId: user.oauthId,
              name: user.profile?.name,
              avatarUrl: user.profile?.avatarUrl,
              isFriendRequestSent: user.isFriendRequestSent,
            }))}
          />
        )}
      </YStack>
    </YStack>
  );
};
