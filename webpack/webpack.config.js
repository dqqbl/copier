const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  mode: "production",
  entry: {
    popup: path.join(srcDir, "/popup/popup.tsx"),
    // options: path.join(srcDir, "/options/options.tsx"),
    background: path.join(srcDir, "background.ts"),
    // content_script: path.join(srcDir, "content_script.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  // optimization: {
  //   splitChunks: {
  //     name: "vendor",
  //     chunks(chunk) {
  //       return chunk.name !== "background";
  //     },
  //   },
  // },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        // 排除node_modules
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: [
          /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        ],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb
          },
        },
        generator: {
          filename: "media/[hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: ".", to: "../", context: "public" }],
    }),
  ],
};
