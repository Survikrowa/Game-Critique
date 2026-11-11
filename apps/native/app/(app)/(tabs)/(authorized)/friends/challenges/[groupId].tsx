import { useLocalSearchParams } from "expo-router";

import { BaseScreenLayout } from "../../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { ChallengesGroupDetailScreen } from "../../../../../../modules/screens/friends/challenges/challenges_group_detail/challenges_group_detail_screen";

const ChallengeGroupDetail = () => {
  const { groupId } = useLocalSearchParams<{ groupId: string }>();
  return (
    <BaseScreenLayout>
      <ChallengesGroupDetailScreen groupId={Number(groupId)} />
    </BaseScreenLayout>
  );
};

export default ChallengeGroupDetail;
