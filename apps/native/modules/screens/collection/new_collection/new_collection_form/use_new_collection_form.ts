import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToastController } from "ui/feedback/toast/use_toast_controller";

import {
  NewCollectionPageFields,
  NewCollectionPageSchema,
} from "./new_collection_form.schema";
import { useCreateCollection } from "./use_create_collection/use_create_collection";

type UseNewCollectionFormArgs = {
  onSuccess: () => void;
};

export const useNewCollectionForm = ({
  onSuccess,
}: UseNewCollectionFormArgs) => {
  const { handleSubmit, ...methods } = useForm<NewCollectionPageFields>({
    resolver: zodResolver(NewCollectionPageSchema),
  });

  const [createCollection] = useCreateCollection();
  const toast = useToastController();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createCollection({
        variables: {
          collection: {
            name: data.name,
            description: data.description,
          },
        },
      });
      toast.show("Kolekcja utworzona", {
        description: "Możesz teraz dodać do niej pierwsze gry",
        variant: "success",
      });
      onSuccess();
      methods.reset();
    } catch (e) {
      toast.show("Error", {
        description: "Cos poszło nie tak przy tworzeniu kolekcji",
        variant: "error",
      });
    }
  });

  return {
    onSubmit,
    methods: {
      ...methods,
      handleSubmit,
    },
  };
};
