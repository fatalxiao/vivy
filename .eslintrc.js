module.exports = {
    'env': {
        'node': true,
        'browser': true,
        'commonjs': true,
        'es6': true,
        'amd': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jest/recommended'
    ],
    plugins: [
        '@typescript-eslint/eslint-plugin',
        'react',
        'react-hooks',
        'jest'
    ],
    overrides: [{
        files: ['*.ts', '*.tsx'],
        extends: [
            'plugin:@typescript-eslint/recommended',
            'plugin:@typescript-eslint/recommended-requiring-type-checking'
        ],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: true,
            tsconfigRootDir: __dirname
        }
    }],
    root: true
};
