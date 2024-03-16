import { useAddGameToCollectionMutation } from "./add_game_to_collection_mutation.generated";

export const useAddGameToCollection = () => {
  return useAddGameToCollectionMutation({
    refetchQueries: ["GetCollections", "CollectionDetails"],
  });
};
