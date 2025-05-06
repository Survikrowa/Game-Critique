import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormProps } from "react-hook-form";
import { ZodType } from "zod";

type UseZodFormArgs<Schema extends ZodType> = {
  schema: Schema;
} & Omit<UseFormProps<Schema["_input"]>, "resolver">;

export const useZodForm = <Schema extends ZodType>({
  schema,
  ...args
}: UseZodFormArgs<Schema>) => {
  return useForm<Schema["_input"]>({
    ...args,
    resolver: zodResolver(schema),
  });
};
