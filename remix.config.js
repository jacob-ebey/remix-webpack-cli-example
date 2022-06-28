import { BundleStatsWebpackPlugin } from "bundle-stats-webpack-plugin";
import { DuplicatesPlugin } from "inspectpack/plugin/index.js";

/** @type {Partial<import('remix-webpack-cli/lib/config-types').RemixWebpackConfig>} */
let config = {
  webpack: (config, { buildFor, mode }) => {
    if (buildFor === "client") {
      config.resolve = config.resolve || {};
      config.resolve.alias = config.resolve.alias || {};
      config.resolve.alias["react"] = "preact/compat";
      config.resolve.alias["react-dom"] = "preact/compat";
      config.resolve.alias["react-dom"] = "preact/compat";
    }

    if (buildFor === "client" && mode === "production") {
      config.plugins = config.plugins || [];
      config.plugins.push(new DuplicatesPlugin({ verbose: true }));
      config.plugins.push(
        new BundleStatsWebpackPlugin({ baseline: true, compare: true })
      );
    }
  },
};

export default config;
