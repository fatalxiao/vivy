/**
 * @file webpack.dev.config.js
 */

// Vendors
const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// base config
const baseConfig = require('../webpack.base.config.js');

module.exports = merge(baseConfig, {

    entry: path.join(__dirname, './src/index.js'),

    output: {
        filename: 'index.[hash].js',
        path: path.join(__dirname, './dist')
    },

    devServer: {
        static: path.join(__dirname, './dist'),
        hot: true,
        port: 3001,
        historyApiFallback: true,
        before: function (app, server, compiler) {
            app.get('/some/path', function (req, res) {
                res.json({
                    custom: 'response'
                });
            });
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        })
    ]

});
