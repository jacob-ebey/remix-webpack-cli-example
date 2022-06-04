import { BundleStatsWebpackPlugin } from "bundle-stats-webpack-plugin";
import { DuplicatesPlugin } from "inspectpack/plugin/index.js";

/** @type {Partial<import('remix-webpack-cli/lib/config-types').RemixWebpackConfig>} */
let config = {
  webpack: (config, { buildFor, mode }) => {
    if (buildFor === "client" && mode === "production") {
      config.plugins = config.plugins || [];
      config.plugins.push(new DuplicatesPlugin({ verbose: true }));
      config.plugins.push(new BundleStatsWebpackPlugin());
    }
  },
};

export default config;
