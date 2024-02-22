import { config } from "@tamagui/config/v2";
import { createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  ...config.tokens,
  color: {
    background: "#050505",
    container: "hsl(212, 35.0%, 9.2%)",
  },
});
const tamaguiConfig = createTamagui({
  ...config,
  tokens,
});

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface Config extends Conf {}
}

export default tamaguiConfig;
