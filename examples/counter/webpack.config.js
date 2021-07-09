/**
 * @file webpack.dev.config.js
 */

const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const baseConfig = require('../webpack.base.config.js');

module.exports = merge(baseConfig, {

    mode: 'development',

    devtool: 'inline-source-map',

    entry: path.join(__dirname, './src/index.js'),

    output: {
        filename: 'index.[hash].js',
        path: path.join(__dirname, './dist')
    },

    devServer: {
        static: path.join(__dirname, './dist'),
        hot: true,
        port: 3000
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        }),
        new CleanWebpackPlugin()
    ]

});
