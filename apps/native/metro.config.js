// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const getModifiedConfig = () => {
  const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

  config.resolver.sourceExts.push("mjs");

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  config.server.enhanceMiddleware = (middleware) => {
    return (req, res, next) => {
      res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      middleware(req, res, next);
    };
  };

  return config;
};

const modifiedConfig = getModifiedConfig();

module.exports = withNativeWind(modifiedConfig, {
  input: "./global.css",
  configPath: "./tailwind.config.js",
});
