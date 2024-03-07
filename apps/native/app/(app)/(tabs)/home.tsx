import { HomeScreen } from "../../../modules/homepage/home_screen";
import { BaseScreenLayout } from "../../../modules/layouts/base_screen_layout/base_screen_layout";

export default function Page() {
  return (
    <BaseScreenLayout>
      <HomeScreen />
    </BaseScreenLayout>
  );
}
