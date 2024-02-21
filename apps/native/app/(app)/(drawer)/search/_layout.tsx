import { Slot } from "expo-router";

import { BaseScreenLayout } from "../../../../modules/layouts/base_screen_layout/base_screen_layout";

const SearchScreenLayout = () => {
  return (
    <BaseScreenLayout>
      <Slot />
    </BaseScreenLayout>
  );
};

export default SearchScreenLayout;
