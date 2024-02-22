import { Controller, FormProvider } from "react-hook-form";
import { Button, Form, Input, Label, Spinner, XStack } from "tamagui";

import { PhotoEditor } from "./photo_editor/photo_editor";
import {
  ProfileEditorFields,
  useProfileEditorForm,
} from "./use_profile_editor_form";

type ProfileEditorFormProps = {
  onSubmit: () => void;
  defaultValues: {
    name: string;
    avatar: string;
  };
};

export const ProfileEditorForm = ({
  onSubmit,
  defaultValues,
}: ProfileEditorFormProps) => {
  const { methods, handleProfileEditorFormSubmit, isUpdatingUserProfile } =
    useProfileEditorForm({
      defaultValues,
      onSubmit,
    });
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleProfileEditorFormSubmit}
        style={{ display: "flex", alignItems: "center", gap: 16 }}
      >
        <PhotoEditor />
        <XStack gap={8}>
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <Label htmlFor="name" color="white">
                    Zmiana nazwy
                  </Label>
                  <Input onChangeText={onChange} value={value} flex={1} />
                </>
              );
            }}
            name="name"
            control={methods.control}
          />
        </XStack>

        <Form.Trigger asChild>
          <Button
            color="white"
            outlineColor="white"
            backgroundColor="black"
            themeInverse
          >
            {isUpdatingUserProfile ? <Spinner size="small" /> : "Zapisz zmiany"}
          </Button>
        </Form.Trigger>
      </Form>
    </FormProvider>
  );
};
