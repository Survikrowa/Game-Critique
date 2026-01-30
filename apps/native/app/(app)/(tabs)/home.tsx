import { BaseScreenLayout } from "@/modules/layouts/base_screen_layout/base_screen_layout";
import { HomeScreen } from "@/modules/screens/homepage/home_screen";

export default function Page() {
  return (
    <BaseScreenLayout>
      <HomeScreen />
    </BaseScreenLayout>
  );
}
