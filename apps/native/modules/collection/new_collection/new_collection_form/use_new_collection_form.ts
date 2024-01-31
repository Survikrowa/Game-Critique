import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  NewCollectionPageFields,
  NewCollectionPageSchema,
} from "./new_collection_form.schema";

export const useNewCollectionForm = () => {
  const { handleSubmit, ...methods } = useForm<NewCollectionPageFields>({
    resolver: zodResolver(NewCollectionPageSchema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return {
    onSubmit,
    methods: {
      ...methods,
      handleSubmit,
    },
  };
};
