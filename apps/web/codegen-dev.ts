import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",
  documents: "src/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    "src/types.ts": {
      plugins: ["typescript"],
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: { extension: ".generated.ts", baseTypesPath: "types.ts" },
      plugins: ["typescript-operations", "typescript-react-query"],
      config: {
        withHooks: true,
        fetcher: "@/codegen/fetcher#fetchData",
        reactQueryVersion: 5,
      },
    },
  },
};

export default config;
