import { getSharedCodegenConfig } from "@repo/codegen";
const codegenConfig = {
  schema: "http://localhost:3000/graphql",
  ...getSharedCodegenConfig("@/codegen/fetcher#fetcher"),
};

export default codegenConfig;
