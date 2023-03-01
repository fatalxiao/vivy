/**
 * @file webpack.base.config.js
 */

module.exports = {

    mode: 'development',

    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                cacheDirectory: true
            }
        }]
    }

};
