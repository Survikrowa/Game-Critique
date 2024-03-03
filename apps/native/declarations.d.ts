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

declare let process: {
  env: {
    EXPO_PUBLIC_GRAPHQL_ENDPOINT: string;
    EXPO_PUBLIC_AUTH0_AUDIENCE: string;
    EXPO_PUBLIC_AUTH0_DOMAIN: string;
    EXPO_PUBLIC_AUTH0_CLIENT_ID: string;
    EXPO_PUBLIC_BASE_API_URL: string;
    NODE_ENV: string;
  };
};
