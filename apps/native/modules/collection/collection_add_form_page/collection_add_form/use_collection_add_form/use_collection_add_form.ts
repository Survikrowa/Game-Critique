import { useToastController } from "@tamagui/toast";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useAddGameToCollection } from "./add_game_to_collection/use_game_to_collection";
import { useGetCollections } from "../../../use_get_collections/use_get_collections";
const CollectionAddFields = z.object({
  collectionId: z.string().min(1, { message: "Nie wybrano kolekcji" }),
});

type CollectionFormAddFields = z.infer<typeof CollectionAddFields>;
export const useCollectionAddForm = (gameId: string) => {
  const { handleSubmit, control, reset } = useForm<CollectionFormAddFields>({});
  const collectionsQuery = useGetCollections();
  const [addGameToCollection, { loading }] = useAddGameToCollection();
  const collectionsItems = collectionsQuery.data?.getProfileCollections.map(
    (collection) => ({
      name: collection.name,
      value: collection.id,
    }),
  );
  const toastController = useToastController();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await addGameToCollection({
        variables: {
          input: {
            hltbGameId: Number(gameId),
            collectionId: Number(data.collectionId),
          },
        },
      });
      reset();
      router.push("/collection");
    } catch (e) {
      toastController.show("Nie udało się dodać gry do kolekcji", {
        variant: "error",
        description: "Spróbuj ponownie później",
      });
    }
  });

  return {
    control,
    collectionsItems,
    onSubmit,
    isSubmitting: loading,
    isLoadingCollection: collectionsQuery.loading,
  };
};
