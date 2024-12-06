import { CustomGraphlQLFetchError } from "@/packages/error_handling/custom_errors.ts";
import { parseGraphQLErrors } from "@/packages/graphlql_errors/parse_graphql_errors.ts";

export const fetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit["headers"],
): (() => Promise<TData>) => {
  return async () => {
    const res = await fetch(import.meta.env.VITE_BASE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        ...options,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const json = await res.json();

    if (json.errors) {
      const statusCode = parseGraphQLErrors(json.errors);
      throw new CustomGraphlQLFetchError(statusCode || 500);
    }

    return json.data;
  };
};
