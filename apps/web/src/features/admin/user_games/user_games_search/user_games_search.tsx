import { RefreshUserGamesStatusListButton } from "@/features/admin/user_games/user_games_search/refresh_user_games_status_list_button/refresh_user_games_status_list_button.tsx";
import { useUserGamesSearch } from "@/features/admin/user_games/user_games_search/use_user_games_search/use_user_games_search.ts";
import { UserGamesTableData } from "@/features/admin/user_games/user_games_search/user_games_table_data/user_games_table_data.tsx";
import { Separator } from "@/packages/ui/data_display/separator.tsx";
import { Checkbox } from "@/packages/ui/inputs/checkbox.tsx";
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

export const UserGamesSearch = () => {
  const { form } = useUserGamesSearch();
  return (
    <section className="flex flex-col gap-4 w-full">
      <Form {...form}>
        <form className="flex gap-4 items-start flex-col">
          <FormField
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Please provide user oauthid</FormLabel>
                  <FormControl>
                    <Input placeholder="oauthId" {...field} />
                  </FormControl>
                  <FormDescription>
                    Based on the provided oauthId, the user's games will be
                    displayed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
            name="oauthId"
            control={form.control}
          />
          <FormField
            render={({ field }) => {
              return (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Group duplicated entries</FormLabel>
                    <FormDescription>
                      Groups duplicated games status entries by game name and
                      removes the non-duplicated ones.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
            name="groupDuplicates"
            control={form.control}
          />
        </form>
      </Form>
      <Separator />
      <div>
        <RefreshUserGamesStatusListButton oauthId={form.watch("oauthId")} />
      </div>
      <UserGamesTableData
        oauthId={form.watch("oauthId")}
        groupDuplicates={form.watch("groupDuplicates")}
      />
    </section>
  );
};
