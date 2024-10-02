import { getSession } from "@auth0/nextjs-auth0";

type FetcherVariables = Record<string, string>;
type FetcherOptions = RequestInit["headers"];

export const fetchServer = async <T>(
  fetcher: (
    variables?: FetcherVariables,
    options?: FetcherOptions,
  ) => () => Promise<T>,
  {
    variables,
    options,
    onError,
  }: {
    variables?: FetcherVariables;
    options?: FetcherOptions;
    onError?: (error: string) => void;
  } = {},
) => {
  try {
    const authorizationHeader = await getSession();
    return await fetcher(variables, {
      ...options,
      Authorization: authorizationHeader?.accessToken,
    })();
  } catch (error) {
    onError?.(error.message);
  }
};
