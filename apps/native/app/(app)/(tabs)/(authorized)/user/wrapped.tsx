import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { StatsWrappedScreen } from "@/modules/screens/user_stats/stats_wrapped/stats_wrapped_screen";

const WrappedPage = () => {
  return (
    <BaseScreenLayout>
      <StatsWrappedScreen />
    </BaseScreenLayout>
  );
};

export default WrappedPage;
