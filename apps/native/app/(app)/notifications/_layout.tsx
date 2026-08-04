import { Stack } from "expo-router";

import { GoBackHeader } from "../../../modules/layouts/go_back_header/go_back_header";

const NotificationsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <GoBackHeader text="Powiadomienia" />,
        }}
      />
    </Stack>
  );
};

export default NotificationsLayout;
