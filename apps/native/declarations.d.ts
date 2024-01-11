declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  import { StyleProp, ViewStyle } from "react-native";
  interface SvgStyle extends StyleProp<ViewStyle> {
    color?: string;
  }
  interface SvgViewProps extends SvgProps {
    style?: SvgStyle;
  }
  const content: React.FC<SvgViewProps>;
  export default content;
}
