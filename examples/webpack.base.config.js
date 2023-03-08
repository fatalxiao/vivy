/**
 * @file webpack.base.config.js
 */

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js']
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        },
        store: 'pack'
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
