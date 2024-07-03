const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    ppr: true,
    reactCompiler: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
