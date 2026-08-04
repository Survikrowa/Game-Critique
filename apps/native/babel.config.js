module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            ui: "./ui",
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
      "react-native-worklets/plugin",
    ],
  };
};
