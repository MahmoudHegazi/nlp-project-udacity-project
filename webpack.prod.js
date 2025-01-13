const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        filename: 'main.bundle.js', //this advanced lvl for handling caching issues main.[hash].js hash is dynamic changed every build so old cached never readed agin after build as it not exist anymore unlike if name static file.js this may make the issue
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        concatenateModules: false,
        minimizer: [
          new TerserWebpackPlugin({}),
          new OptimizeCSSAssetsWebpackPlugin({}), // Minimize CSS
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW()
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
