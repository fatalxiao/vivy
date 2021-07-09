/**
 * @file webpack.base.config.js
 */

const path = require('path');

/**
 * css loader config
 * @type {[]}
 */
const cssLoaderConfig = ['style-loader', {
    loader: 'css-loader',
    options: {
        importLoaders: 1
    }
}, {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                'postcss-preset-env'
            ]
        }
    }
}];

module.exports = {

    resolve: {
        extensions: ['.js', '.scss'],
        alias: {
            'vivy': path.join(__dirname, '../src')
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                cacheDirectory: true
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }]
    }

};
