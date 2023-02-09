const currentTask = process.env.npm_lifecycle_event
const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")

const config = {
  entry: "./app/Main.js",
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "app")
  },
  plugins: [new HtmlWebpackPlugin({ template: "./app/index.html" })],
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, "app")
    },
    hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { useBuiltIns: "usage", corejs: 3, targets: "defaults" }], "@babel/preset-react"]
          }
        }
      }
    ]
  }
}

if (currentTask == "build") {
  config.mode = "production"
  delete config.devServer
  config.output.filename = "[name].[hash].js"
  config.output.path = path.resolve(__dirname, "dist")
  config.output.clean = true
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader
  config.plugins.push(new MiniCssExtractPlugin({ filename: "main.[hash].css" }), new WebpackManifestPlugin())
}

module.exports = config
