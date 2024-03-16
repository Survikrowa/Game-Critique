import { Spinner } from "tamagui";
import { AlertDialog } from "ui/overlay/alert_dialog";

import { useRemoveCollection } from "../use_remove_collection/use_remove_collection";

type RemoveCollectionConfirmationModalProps = {
  open: boolean;
  onOpen: (open: boolean) => void;
  onClose: () => void;
  collectionId: string;
};

export const RemoveCollectionConfirmationModal = ({
  open,
  onOpen,
  onClose,
  collectionId,
}: RemoveCollectionConfirmationModalProps) => {
  const [removeCollection, { loading }] = useRemoveCollection();

  const handleRemoveCollection = async () => {
    await removeCollection({
      variables: {
        collection: {
          collectionId: Number(collectionId),
        },
      },
      onCompleted: () => {
        onOpen(false);
      },
    });
  };
  return (
    <AlertDialog
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      buttonsText={{
        approve: loading ? <Spinner size="large" /> : "Tak",
        decline: "Nie",
      }}
      description="Po usunięciu kolekcji nie będzie można jej przywrócić."
      title="Czy na pewno chcesz usunąć kolekcje?"
      onApprove={handleRemoveCollection}
    />
  );
};
