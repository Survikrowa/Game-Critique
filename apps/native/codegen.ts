import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ["modules/**/*.graphql"],
  generates: {
    "__generated__/types.ts": { plugins: ["typescript"] },
    "./": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.ts",
        baseTypesPath: "__generated__/types.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
      },
    },
  },
};
export default config;
