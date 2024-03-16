import { Folder } from "@tamagui/lucide-icons";
import { Controller } from "react-hook-form";
import { Button, Form } from "tamagui";
import { Select } from "ui/forms/select";
import { Text } from "ui/typography/text";

import { useCollectionAddForm } from "./use_collection_add_form/use_collection_add_form";

type CollectionAddFormProps = {
  gameId: string;
};

export const CollectionAddForm = ({ gameId }: CollectionAddFormProps) => {
  const {
    isLoadingCollection,
    isSubmitting,
    onSubmit,
    collectionsItems,
    control,
  } = useCollectionAddForm(gameId);

  if (isLoadingCollection) {
    return (
      <Text size="small" weight="normal" color="primary">
        Trwa ładowanie wymaganych informacji...
      </Text>
    );
  }

  return (
    <Form onSubmit={onSubmit} gap={8}>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => {
          return (
            <>
              <Select
                value={value}
                defaultValue=""
                label="Twoje kolekcje"
                placeholder="Wybierz kolekcje..."
                onChange={onChange}
                items={collectionsItems || []}
                icon={<Folder size="$2" color="black" />}
              />
              {error?.message && (
                <Text size="small" weight="normal" color="warning">
                  {error.message}
                </Text>
              )}
            </>
          );
        }}
        name="collectionId"
        control={control}
      />

      <Form.Trigger asChild>
        <Button
          color="white"
          outlineColor="white"
          backgroundColor="black"
          themeInverse
          width="100%"
          marginTop={8}
          marginBottom={4}
        >
          {isSubmitting ? "Dodawanie..." : "Dodaj do kolekcji"}
        </Button>
      </Form.Trigger>
    </Form>
  );
};
