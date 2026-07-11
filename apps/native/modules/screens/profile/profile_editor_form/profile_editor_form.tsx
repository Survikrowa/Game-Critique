import { ActivityIndicator } from "react-native";
import { Controller, FormProvider } from "react-hook-form";
import { Input } from "ui/forms/input";
import { Text } from "ui/typography/text";

import { PhotoEditor } from "./photo_editor/photo_editor";
import { useProfileEditorForm } from "./use_profile_editor_form";

import { Button, ButtonText } from "@/ui/forms/button/button";
import { HStack } from "@/ui/layout/hstack/hstack";
import { VStack } from "@/ui/layout/vstack/vstack";

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
      <VStack className="items-center gap-4 w-full">
        <PhotoEditor />
        <HStack className="gap-2 items-center">
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  <Input
                    onChange={onChange}
                    value={value}
                    label="Zmiana nazwy"
                  />
                </>
              );
            }}
            name="name"
            control={methods.control}
          />
        </HStack>
        <Button
          action="primary"
          onPress={handleProfileEditorFormSubmit}
          isDisabled={isUpdatingUserProfile}
        >
          {isUpdatingUserProfile ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <ButtonText>Zapisz zmiany</ButtonText>
          )}
        </Button>
      </VStack>
    </FormProvider>
  );
};
