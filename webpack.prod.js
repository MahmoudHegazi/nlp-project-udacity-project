const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const WorkBoxPlugin = require('workbox-webpack-plugin');

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
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']  // MiniCssExtractPlugin.loader as we create new css file instead of serve for js so this loader now process the inject the generated page url in the html  
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // in pord unlike dev we need real removal of files so dry true, (in dev may want see console messages only as dev inmemory)
            dry: false,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"  // This extracts the CSS into a separate file
        }),
        new WorkBoxPlugin.GenerateSW({
            swDest: 'service-worker.js', // Your output file name
            exclude: [/\.map$/, /asset-manifest\.json$/], //  /asset-manifest\.json$/ for react or other libs (note even json and .map files will cached by service-worker so it tell it not cache this things (map sure for the source-map part to display which page have the error not display error in generated file))
            // Point to your custom service worker file
            clientsClaim: true, //  Ensures the service worker immediately controls the page (no need refresh to take control)
            skipWaiting: true, // // Forces new service worker to take control immediately (this kind of help clear cache)
        })
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}