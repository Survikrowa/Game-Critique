import { Stack } from "expo-router";

import { GoBackHeader } from "../../../../../../../modules/layouts/go_back_header/go_back_header";

export const GameStatusLayout = () => {
  return (
    <Stack initialRouteName="[games_status_id]">
      <Stack.Screen
        name="[games_status_id]"
        options={{
          header: () => <GoBackHeader text="Edycja statusu" />,
        }}
      />
    </Stack>
  );
};

export default GameStatusLayout;
