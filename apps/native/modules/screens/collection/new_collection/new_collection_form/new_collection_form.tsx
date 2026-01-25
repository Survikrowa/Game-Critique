import { router } from "expo-router";
import { Controller, FormProvider } from "react-hook-form";
import { Button, Form } from "tamagui";
import { Input } from "ui/forms/input";
import { TextArea } from "ui/forms/text_area";
import { Text } from "ui/typography/text";

import { useNewCollectionForm } from "./use_new_collection_form";

import { VStack } from "@/ui/layout/vstack/vstack";

export const NewCollectionForm = () => {
  const { methods, onSubmit } = useNewCollectionForm({
    onSuccess: () => router.push("/collection"),
  });
  return (
    <FormProvider {...methods}>
      <Form onSubmit={onSubmit} display="flex" maxWidth={254} width="100%">
        <VStack className="gap-2 items-center justify-center w-full">
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <Input
                  onChange={onChange}
                  value={value}
                  label="Nazwa*"
                  errorMessage={methods.formState.errors.name?.message}
                />
              );
            }}
            name="name"
            control={methods.control}
          />
          <Controller
            render={({ field: { onChange, value } }) => {
              return (
                <TextArea onChange={onChange} value={value} label="Opis" />
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
              borderColor="white"
              themeInverse
              width="100%"
              marginTop={8}
              marginBottom={4}
            >
              Utwórz
            </Button>
          </Form.Trigger>
          <Text size="small" weight="normal" color="primary">
            Pola oznaczone gwiazdką są wymagane
          </Text>
        </VStack>
      </Form>
    </FormProvider>
  );
};
