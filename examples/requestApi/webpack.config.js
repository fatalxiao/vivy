/**
 * @file webpack.dev.config.js
 */

// Vendors
const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Base config
const baseConfig = require('../webpack.base.config.js');

module.exports = merge(baseConfig, {

    entry: path.join(__dirname, './src/index.js'),

    output: {
        filename: 'index.[hash].js',
        path: path.join(__dirname, './dist')
    },

    devServer: {
        static: path.join(__dirname, './dist'),
        open: true,
        hot: true,
        port: 3000,
        historyApiFallback: true,
        setupMiddlewares: (middlewares, devServer) => {

            // Reponse user list
            devServer.app.get('/getUserList', (req, res) => {

                const data = [
                    'User-1',
                    'User-2',
                    'User-3',
                    'User-4',
                    'User-5',
                    'User-6'
                ];

                // Delay 1s
                setTimeout(() => res.json(
                    req.query.searchText ?
                        data.filter(item => item.toUpperCase().includes(req.query.searchText.toUpperCase()))
                        :
                        data
                ), 1000);

            });

            return middlewares;

        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        })
    ]

});
