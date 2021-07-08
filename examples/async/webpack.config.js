/**
 * @file webpack.dev.config.js
 * @author sunday(sunday.wei@derbysoft.com)
 */

const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const baseConfig = require('../webpack.base.config.js');

module.exports = merge(baseConfig, {

    // 设置为开发模式
    mode: 'development',

    devtool: 'inline-source-map',

    // 入口文件
    entry: './src/index.js',

    output: {
        filename: 'index.[hash].js',
        path: path.join(__dirname, './dist')
    },

    // 配置服务端目录和端口
    devServer: {
        static: path.join(__dirname, './dist'),
        hot: true,
        port: 3000
    },

    // 配置相应的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin()
    ]

});
