import { z } from "zod";

import { GamesListTable } from "@/features/admin/games/games_list_table/games_list_table.tsx";
import { useZodForm } from "@/packages/forms/use_zod_form.ts";
import { Separator } from "@/packages/ui/data_display/separator.tsx";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/packages/ui/inputs/form.tsx";
import { Input } from "@/packages/ui/inputs/input.tsx";

const gamesListSchema = z.object({
  name: z.string().optional(),
});

export const GamesList = () => {
  const form = useZodForm({
    schema: gamesListSchema,
    defaultValues: {
      name: "",
    },
  });
  return (
    <section className="flex flex-col gap-4 w-full">
      <Form {...form}>
        <form className="flex gap-4 items-start flex-col">
          <FormField
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Game name</FormLabel>
                  <FormControl>
                    <Input placeholder="Game name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Based on the provided game name, the filtered games will be
                    displayed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
            name="name"
            control={form.control}
          />
        </form>
      </Form>
      <Separator />
      <GamesListTable search={form.watch("name")} />
    </section>
  );
};
