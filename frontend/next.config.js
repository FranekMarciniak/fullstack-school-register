/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
  webpack: withBundleAnalyzer({
    poweredByHeader: false,
    trailingSlash: true,
    basePath: "",
    // The starter code load resources from `public` folder with `router.basePath` in React components.
    // So, the source code is "basePath-ready".
    // You can remove `basePath` if you don't need it.
    reactStrictMode: true,
  }),
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://mars-app-backend.herokuapp.com/api/:slug*"
            : "http://localhost:4000/api/:slug*",
      },
    ];
  },
};
