const path = require("path")
const webpack = require('webpack')

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js",
        view: "./src/view.js",
        validated: "./src/validated.js",
        contact: "./src/contact.js",
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    plugins: [
        new webpack.DefinePlugin({
            // HOST: JSON.stringify('http://invest.vcsc.com.vn/mo-tai-khoan-online')
            HOST: JSON.stringify('http://localhost:5002')
        })
    ],
    resolve: {
        alias: {
            root: path.resolve(__dirname, "./src")
        }
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader" } }
        ]
    },
    devServer: {
        hot: true,
        host: "0.0.0.0",
        overlay: true,
        writeToDisk: false,
        contentBase: [
            path.join(__dirname, "build"),
            path.join(__dirname, "public"),
        ],
        compress: false,
        port: 5003,
        open: true,
        https: false,
        historyApiFallback: {
            rewrites: [
                { from: /^\/$/, to: '/index.html' },
                { from: /.\/./, to: 'index.html' }
            ]
        }
    }
}