import { useCreateCollectionMutation } from "./create_collection.generated";
import { GetCollectionsDocument } from "../../../use_get_collections/get_collections.generated";

export const useCreateCollection = () => {
  return useCreateCollectionMutation({
    refetchQueries: [{ query: GetCollectionsDocument }],
  });
};
