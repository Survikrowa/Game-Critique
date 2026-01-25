import { Controller, FormProvider } from "react-hook-form";
import { Button, Form, Input, Label, Spinner } from "tamagui";

import { PhotoEditor } from "./photo_editor/photo_editor";
import { useProfileEditorForm } from "./use_profile_editor_form";

import { HStack } from "@/ui/layout/hstack/hstack";

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
        <HStack className="gap-2">
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
        </HStack>

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
