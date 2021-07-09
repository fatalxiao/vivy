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
            app.get('/getUserList', function (req, res) {
                res.json({
                    userList: [
                        'User-1',
                        'User-2',
                        'User-3',
                        'User-4',
                        'User-5',
                        'User-6'
                    ]
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
