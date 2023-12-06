import { config } from "@tamagui/config/v2";
import { createTamagui } from "tamagui";
const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "tamagui" {
  interface Config extends Conf {}
}

export default tamaguiConfig;
