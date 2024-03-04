import { Stack } from "expo-router";

import { GoBackHeader } from "../../../../../../modules/layouts/go_back_header/go_back_header";
import { Header } from "../../../../../../modules/layouts/header/header";

const CollectionLayout = () => {
  return (
    <Stack initialRouteName="collection">
      <Stack.Screen
        name="collection"
        options={{
          header: Header,
        }}
      />
      <Stack.Screen
        name="new_collection"
        options={{
          header: () => <GoBackHeader text="Tworzenie nowej kolekcji" />,
        }}
      />
      <Stack.Screen
        name="collection_add_form/[id]/index"
        options={{
          header: () => <GoBackHeader text="Dodajesz do" />,
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          header: () => <GoBackHeader text="TUTAJ WKLEJ NAZWE  KOLEKCJI" />,
        }}
      />
    </Stack>
  );
};

export default CollectionLayout;
