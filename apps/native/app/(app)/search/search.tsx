import { BaseScreenLayout } from "../../../modules/layouts/base_screen_layout/base_screen_layout";
import { SearchScreen } from "../../../modules/screens/search/search_screen";

const SearchPage = () => {
  return (
    <BaseScreenLayout>
      <SearchScreen redirectTo="search/game" />
    </BaseScreenLayout>
  );
};

export default SearchPage;
