import { CodegenConfig } from "@graphql-codegen/cli";
import "@dotenvx/dotenvx/config";

const config: CodegenConfig = {
  schema:
    process.env.EXPO_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql",
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
