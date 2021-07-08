/**
 * @file webpack.base.config.js
 */

module.exports = {

    resolve: {
        extensions: ['.js']
    },

    module: {
        rules: [{
            test: /\.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            options: {
                cacheDirectory: true
            }
        }]
    }

};
