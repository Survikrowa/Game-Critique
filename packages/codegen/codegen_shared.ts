import { CodegenConfig } from "@graphql-codegen/cli";

export const getSharedCodegenConfig = (fetcherPath: string): CodegenConfig => ({
  documents: ["modules/**/*.graphql", "packages/**/*.graphql"],
  generates: {
    "__generated__/types.ts": { plugins: ["typescript"] },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "__generated__/types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-query"],
      config: {
        isReactHook: false,
        withHooks: true,
        fetcher: fetcherPath,
        exposeQueryKeys: true,
        exposeDocument: true,
        exposeFetcher: true,
        exposeMutationKeys: true,
        reactQueryVersion: 5,
      },
    },
  },
});
