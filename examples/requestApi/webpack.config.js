/**
 * @file webpack.dev.config.js
 */

// Vendors
const path = require('path');
const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const bodyParser = require('body-parser');

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
        onBeforeSetupMiddleware: function (server) {

            server.app.use(bodyParser.json());

            server.app.post('/getUserList', function (req, res) {

                console.log('req::', req);
                console.log('req.params::', req.params);
                console.log('req.body::', req.body);

                const data = [
                    'User-1',
                    'User-2',
                    'User-3',
                    'User-4',
                    'User-5',
                    'User-6'
                ];

                setTimeout(() => res.json(data.filter(item => item.includes('1'))), 3000);

            });
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html')
        })
    ]

});
