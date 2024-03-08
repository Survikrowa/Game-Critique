import { Stack } from "expo-router";

import { GoBackHeader } from "../../../../../../modules/layouts/go_back_header/go_back_header";

export const GameStatusReviewsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="game_status_reviews/[game_status_id]"
        options={{
          header: () => <GoBackHeader text="Recenzje" />,
        }}
      />
      <Stack.Screen
        name="game_status_review"
        options={{
          header: ({ options: { title } }) => (
            <GoBackHeader text={title || ""} />
          ),
        }}
      />
    </Stack>
  );
};

export default GameStatusReviewsLayout;
