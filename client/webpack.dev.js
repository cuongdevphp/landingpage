const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    view: "./src/view.js",
    validated: "./src/validated.js",
    contact: "./src/contact.js",
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
      alias: {
          root: path.resolve(__dirname, "./src")
      }
  },
  plugins: [
    new webpack.DefinePlugin({
      // HOST: JSON.stringify('http://invest.vcsc.com.vn/mo-tai-khoan-online')
      HOST: JSON.stringify('http://localhost:5002')
    }),
    new MinifyPlugin({ 
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
};
