import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { PreferencesScreen } from "@/modules/screens/profile/preferences_screen/preferences_screen";

const PreferencesRoute = () => {
  return (
    <BaseScreenLayout>
      <PreferencesScreen />
    </BaseScreenLayout>
  );
};

export default PreferencesRoute;
