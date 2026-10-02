import { useLocalSearchParams } from "expo-router";

import { BaseScreenLayout } from "../../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { CreateChallengeScreen } from "../../../../../../modules/screens/friends/challenges/create_challenge/create_challenge_screen";

const CreateChallenge = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  return (
    <BaseScreenLayout>
      <CreateChallengeScreen groupId={Number(groupId)} />
    </BaseScreenLayout>
  );
};

export default CreateChallenge;
