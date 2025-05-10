import { BaseScreenLayout } from "../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { UserStatsScreen } from "../../../../../modules/screens/user_stats/user_stats_screen";

const StatsScreen = () => {
  return (
    <BaseScreenLayout>
      <UserStatsScreen />
    </BaseScreenLayout>
  );
};

export default StatsScreen;
