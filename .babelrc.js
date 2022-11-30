/**
 * @file .babelrc.js
 */

module.exports = {
    'env': {

        'development': {
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false,
                        useBuiltIns: 'usage',
                        corejs: 3
                    }
                ]
            ]
        },

        'test': {
            'presets': [
                '@babel/preset-env'
            ]
        }

    }
};
