import { Stack } from "expo-router";

import { GoBackHeader } from "../../../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../../../modules/layouts/header/header";

const FriendsLayout = () => {
  return (
    <Stack initialRouteName="friends_list">
      <Stack.Screen
        name="friends_list"
        options={{
          header: () => <Header />,
        }}
      />
      <Stack.Screen
        name="friends_requests"
        options={{
          header: () => <GoBackHeader text="Zaproszenia do znajomych" />,
        }}
      />
      <Stack.Screen
        name="friends_search"
        options={{
          header: () => <GoBackHeader text="Wyszukaj znajomych" />,
        }}
      />
      <Stack.Screen
        name="user_profile/[oauth_id]/index"
        options={{
          header: () => <GoBackHeader text="Profil" />,
        }}
      />
      <Stack.Screen
        name="games_status_info/[games_status_id]"
        options={{
          header: () => <GoBackHeader text="NAZWA GRY" />,
        }}
      />
      <Stack.Screen
        name="(game_status_reviews)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default FriendsLayout;
