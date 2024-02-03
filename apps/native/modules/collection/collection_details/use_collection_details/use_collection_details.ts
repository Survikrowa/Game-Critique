import {
  CollectionDetailsQuery,
  useCollectionDetailsQuery,
} from "./collection_details.generated";

type UseCollectionDetailsArgs = {
  id: number;
  onSuccess: (data: CollectionDetailsQuery) => void;
};
export const useCollectionDetails = ({
  id,
  onSuccess,
}: UseCollectionDetailsArgs) => {
  return useCollectionDetailsQuery({
    variables: {
      id,
    },
    onCompleted: (data) => {
      onSuccess(data);
    },
  });
};
