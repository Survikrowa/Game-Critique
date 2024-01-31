import { useGetCollectionsQuery } from "./get_collections.generated";

export const useGetCollections = () => {
  return useGetCollectionsQuery({
    fetchPolicy: "network-only",
  });
};
