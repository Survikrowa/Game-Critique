import { Stack } from "expo-router";

import { GoBackHeader } from "../../../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../../../modules/layouts/header/header";

const UserLayout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          header: Header,
        }}
      />
      <Stack.Screen
        name="hltb"
        options={{
          header: () => <GoBackHeader text="Import profilu HLTB" />,
        }}
      />
      <Stack.Screen
        name="stats"
        options={{
          header: () => <GoBackHeader text="Statystyki" />,
        }}
      />
    </Stack>
  );
};

export default UserLayout;
