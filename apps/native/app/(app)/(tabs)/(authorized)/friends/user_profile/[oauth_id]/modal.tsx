import { BaseScreenLayout } from "../../../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { GamesStatusFiltersModal } from "../../../../../../../modules/screens/games/games_status_filters_modal/games_status_filters_modal";

export default function Modal() {
  return (
    <BaseScreenLayout>
      <GamesStatusFiltersModal />
    </BaseScreenLayout>
  );
}
