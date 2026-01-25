// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const getModifiedConfig = () => {
  // Find the workspace root, this can be replaced with `find-yarn-workspace-root`
  const workspaceRoot = path.resolve(__dirname, "../../");
  const projectRoot = __dirname;

  const config = getDefaultConfig(__dirname);
  // 1. Watch all files within the monorepo
  config.watchFolders = [workspaceRoot];
  // 2. Let Metro know where to resolve packages, and in what order
  config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, "node_modules"),
    path.resolve(workspaceRoot, "node_modules"),
  ];
  // 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
  // config.resolver.disableHierarchicalLookup = true;
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

  return config;
};

const modifiedConfig = getModifiedConfig();

module.exports = withNativeWind(modifiedConfig, { input: "./global.css" });
