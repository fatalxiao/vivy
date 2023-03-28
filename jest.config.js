/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePaths: ['.'],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    }
};
