import { AlertDialog, Button, Spinner, XStack, YStack } from "tamagui";

import { useRemoveCollection } from "../use_remove_collection/use_remove_collection";

type RemoveCollectionConfirmationModalProps = {
  open: boolean;
  onOpen: (open: boolean) => void;
  collectionId: string;
};

export const RemoveCollectionConfirmationModal = ({
  open,
  onOpen,
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
    <AlertDialog open={open}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack space>
            <AlertDialog.Title>
              Czy na pewno chcesz usunąć kolekcje?
            </AlertDialog.Title>
            <AlertDialog.Description>
              Po usunięciu kolekcji nie będzie można jej przywrócić.
            </AlertDialog.Description>

            <XStack space="$3" justifyContent="flex-end" gap={8}>
              {loading ? (
                <Spinner size="large" />
              ) : (
                <>
                  <Button onPress={() => onOpen(false)}>Nie</Button>
                  <AlertDialog.Action asChild>
                    <Button
                      theme="active"
                      backgroundColor="black"
                      color="white"
                      onPress={handleRemoveCollection}
                    >
                      Tak
                    </Button>
                  </AlertDialog.Action>
                </>
              )}
            </XStack>
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
};
