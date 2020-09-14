var webpack = require("webpack");
var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BabelMultiTargetPlugin } = require("webpack-babel-multi-target-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./build/default"),
    publicPath: "/",
  },
  node: {
    process: false,
    fs: false,
    Buffer: false,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: BabelMultiTargetPlugin.loader(),
      },
      {
        test: /\.(less)$/,
        loaders: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(css)$/,
        loaders: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
      },
    ],
    noParse: [/xlsx.core.min.js/, /xlsx.full.min.js/, /jszip.js$/],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".less"],
    alias: {
      "./dist/cpexcel.js": "",
      "~": path.resolve(__dirname, "./src/"),
    },
  },
  externals: [
    {
      "./cptable": "var cptable",
      "../xlsx.js": "var _XLSX",
    },
  ],
  plugins: [
    new webpack.ProvidePlugin({
      Promise: "es6-promise",
      fetch:
        "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch",
    }),
    new webpack.ProvidePlugin({
      fetch: "imports?this=>global!exports?global.fetch!whatwg-fetch",
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "index.html"),
      filename: "index.html",
      inject: "body",
    }),
    new BabelMultiTargetPlugin({
      babel: {
        // @babel/preset-env options common for all bundles
        presetOptions: {
          // Don’t add polyfills, they are provided from webcomponents-loader.js
          useBuiltIns: false,
        },
      },

      // Modules excluded from targeting into different bundles
      doNotTarget: [
        // Array of RegExp patterns
      ],

      // Modules that should not be transpiled
      exclude: [
        // Array of RegExp patterns
      ],

      // Fix for `nomodule` attribute to work correctly in Safari 10.1
      safari10NoModuleFix: "inline-data-base64",

      // Target browsers with and without ES modules support
      targets: {
        es6: {
          browsers: [
            "last 2 Chrome major versions",
            "last 2 ChromeAndroid major versions",
            "last 2 Edge major versions",
            "last 2 Firefox major versions",
            "last 3 Safari major versions",
            "last 3 iOS major versions",
          ],
          tagAssetsWithKey: false, // don’t append a suffix to the file name
          esModule: true, // marks the bundle used with <script type="module">
        },
        es5: {
          browsers: ["ie 11"],
          tagAssetsWithKey: true, // append a suffix to the file name
          noModule: true, // marks the bundle included without `type="module"`
        },
      },
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: "./src/index.js",
    public: "localhost:8080",
    historyApiFallback: true,
    watchContentBase: true,
  },
};
