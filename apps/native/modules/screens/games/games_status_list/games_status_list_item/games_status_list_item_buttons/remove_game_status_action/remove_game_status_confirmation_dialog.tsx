import { AlertDialog } from "ui/overlay/alert_dialog";

type RemoveGameStatusConfirmationDialogProps = {
  open: boolean;
  onOpen: (open: boolean) => void;
  onClose: () => void;
  onApprove: () => void;
};
export const RemoveGameStatusConfirmationDialog = ({
  open,
  onOpen,
  onClose,
  onApprove,
}: RemoveGameStatusConfirmationDialogProps) => {
  return (
    <AlertDialog
      title="Czy jesteś pewny, że chcesz usunąć ten status?"
      description="Akcja jest nieodwracalna"
      onApprove={onApprove}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      buttonsText={{
        approve: "Tak",
        decline: "Nie",
      }}
    />
  );
};
