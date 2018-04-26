const path = require("path");
const webpack = require("webpack");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  output: {
    library: "ocelot-video-display",
    libraryTarget: "commonjs2",
    filename: "index.js",
    path: path.join(__dirname, "/dist")
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
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    })
  ],
  node: {
    global:false
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
}
