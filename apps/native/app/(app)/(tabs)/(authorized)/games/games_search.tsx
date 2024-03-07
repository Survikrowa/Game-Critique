import { BaseScreenLayout } from "../../../../../modules/layouts/base_screen_layout/base_screen_layout";
import { SearchScreen } from "../../../../../modules/search/search_screen";

const SearchPage = () => {
  return (
    <BaseScreenLayout>
      <SearchScreen redirectTo="/games/game" />
    </BaseScreenLayout>
  );
};

export default SearchPage;
