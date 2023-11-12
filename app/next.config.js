const withOffline = require("next-offline");
const { execSync } = require("child_process");
const webpack = require("webpack");
const { parsed: localEnv } = require("dotenv").config();

const pkg = require("./package.json");
let gitBranch;
let appVersion;
if (process.env.DEV_MODE) {
  try {
    const buffer = execSync("git describe --contains --all HEAD");
    gitBranch = (buffer.toString() || "").trim().replace("remotes/origin/", "");
  } catch (error) {
    console.log("[Warning] Failed to get current git branch");
    gitBranch = "";
  }
  appVersion = pkg.version;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
    incrementalCacheHandlerPath: require.resolve('./cache-handler.js'),
    isrMemoryCacheSize: 0, // disable default in-memory caching
  },
  // generateBuildId: async () => {
    // This could be anything, using the latest git hash
    // return process.env.GIT_HASH
  // },
  env: {
    STRIPE_PUBLIC_KEY: 'your_stripe_public_key',
    API_URL: 'http://localhost:4003/graphql',
  },
  entry: ["react-hot-loader/patch", "./app"],
  pageExtensions: ["tsx", "ts"],
  reactStrictMode: true,
  "fontawesome-svg-core": {
    license: "free",
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
        },
      },
    });

    return config;
  },
  webpackDevMiddleware(config) {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  publicRuntimeConfig: {
    gitBranch,
    appVersion,
  },
  transformManifest: (manifest) => ["/"].concat(manifest),
  generateInDevMode: false,
  workboxOpts: {
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: new RegExp("/_offline"),
        handler: "CacheFirst",
        options: {
          cacheName: "offline",
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
          },
        },
      },
    ],
  },
};

module.exports = withOffline(nextConfig);
