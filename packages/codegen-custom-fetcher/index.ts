export const getFetcher = (url: string, headers?: RequestInit["headers"]) => {
  return <TResult, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit["headers"],
  ): (() => Promise<TResult>) => {
    return async () => {
      const head = headers ? headers : options;
      const res = await fetch("https://api.url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...head,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const json = await res.json();

      if (json.errors) {
        const { message } = json.errors[0] || {};
        throw new Error(message || "Error…");
      }

      return json.data;
    };
  };
};
