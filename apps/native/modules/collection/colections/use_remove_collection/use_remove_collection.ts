import { useRemoveCollectionMutation } from "./remove_collection.generated";

export const useRemoveCollection = () => {
  return useRemoveCollectionMutation({
    refetchQueries: ["GetCollections"],
  });
};
