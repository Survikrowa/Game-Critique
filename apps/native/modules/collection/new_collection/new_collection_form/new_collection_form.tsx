import { Controller, FormProvider } from "react-hook-form";
import { Button, Form, Input, Label, TextArea, XStack, YStack } from "tamagui";

import { useNewCollectionForm } from "./use_new_collection_form";

export const NewCollectionForm = () => {
  const { methods, onSubmit } = useNewCollectionForm();
  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} display="flex" maxWidth={254} width="100%">
        <YStack
          gap={8}
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <YStack
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Label htmlFor="name" color="black">
                    Nazwa
                  </Label>
                  <Input
                    onChangeText={onChange}
                    value={value}
                    minHeight={32}
                    width="100%"
                  />
                </YStack>
              );
            }}
            name="name"
            control={methods.control}
          />
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <YStack
                  width="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Label htmlFor="description" color="black">
                    Opis
                  </Label>
                  <TextArea
                    onChangeText={onChange}
                    value={value}
                    minHeight={32}
                    width="100%"
                  />
                </YStack>
              );
            }}
            name="description"
            control={methods.control}
          />
          <Form.Trigger asChild>
            <Button
              color="white"
              outlineColor="white"
              backgroundColor="black"
              themeInverse
              width="100%"
              marginTop={8}
            >
              Utwórz
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </FormProvider>
  );
};
