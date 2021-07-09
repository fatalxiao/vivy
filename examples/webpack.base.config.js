/**
 * @file webpack.base.config.js
 */

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

    mode: 'development',

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js', '.scss']
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
