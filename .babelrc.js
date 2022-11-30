/**
 * @file .babelrc.js
 */

const plugins = [
    '@babel/plugin-proposal-export-default-from'
];

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
            ],
            plugins
        },

        'test': {
            'presets': [
                '@babel/preset-env'
            ],
            plugins
        }

    }
};
