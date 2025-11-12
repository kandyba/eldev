const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PostcssPresetEnv = require("postcss-preset-env");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const WEBPACK_MODE = mode === "production" ? "production" : "development";

module.exports = {
  mode: WEBPACK_MODE,
  entry: path.resolve(__dirname, "src", "index.js"),
  devServer: {
    open: true,
    hot: true,
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "images/[hash][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug",
      // filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [PostcssPresetEnv],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpg|jpeg|svg)/,
        type: "asset/resource",
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
};
