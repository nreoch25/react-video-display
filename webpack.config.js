const path = require("path");
const webpack = require("webpack");
var HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "dev"),
  entry: "./dev",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/dist"),
    publicPath: "/"
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, "dev", "index.html"),
      filename: "index.html"
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, "dev"),
    compress: true,
    port: 8000
  }
}
