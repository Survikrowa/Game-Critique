import { Controller } from "react-hook-form";
import { Button, Form, Input, Label, XStack } from "tamagui";

import { PhotoEditor } from "./photo_editor/photo_editor";
import {
  ProfileEditorFields,
  useProfileEditorForm,
} from "./use_profile_editor_form";

type ProfileEditorFormProps = {
  onSubmit: () => void;
  defaultValues: ProfileEditorFields;
};

export const ProfileEditorForm = ({
  onSubmit,
  defaultValues,
}: ProfileEditorFormProps) => {
  const { control, handleProfileEditorFormSubmit } = useProfileEditorForm({
    defaultValues,
    onSubmit,
  });
  return (
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
                  Twoja nickname
                </Label>
                <Input onChangeText={onChange} value={value} flex={1} />
              </>
            );
          }}
          name="name"
          control={control}
        />
      </XStack>

      <Form.Trigger asChild>
        <Button
          color="white"
          outlineColor="white"
          backgroundColor="black"
          themeInverse
        >
          Zapisz zmiany
        </Button>
      </Form.Trigger>
    </Form>
  );
};
