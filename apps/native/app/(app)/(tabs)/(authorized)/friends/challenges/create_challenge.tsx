import { useLocalSearchParams } from "expo-router";

import { CreateChallengeScreen } from "../../../../../../modules/screens/friends/challenges/create_challenge/create_challenge_screen";

const CreateChallenge = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  return <CreateChallengeScreen groupId={Number(groupId)} />;
};

export default CreateChallenge;
